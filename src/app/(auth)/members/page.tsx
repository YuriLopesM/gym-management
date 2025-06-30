'use client'
import { Fragment, useEffect, useState } from 'react'

import { useBreakpoint, useDebounce } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { MembersTable } from '@/components'
import { MemberForm, MembersCard } from './components'

import { Add, Search } from '@mui/icons-material'
import {
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import * as z from 'zod'

import { setupMocks } from '@/mocks'
import { memberApi } from '@/mocks/api/member'
import { FormOperation, Member } from '@/types'

interface FormData {
  searchTerm: string
}

const schema = z.object({
  searchTerm: z.string().trim(),
})

export default function MembersPage() {
  useEffect(setupMocks, [])

  const { isMobile, isBiggerThanMobile } = useBreakpoint()

  const { control } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      searchTerm: '',
    },
  })

  const searchTerm = useWatch({
    control,
    name: 'searchTerm',
  })

  const debouncedSearch = useDebounce(searchTerm, 300)

  const [openForm, setOpenForm] = useState(false)
  const [formOperation, setFormOperation] = useState<FormOperation>('add')
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null)

  const [members, setMembers] = useState<Member[]>([])

  const filteredMembers = members.filter((member) => {
    const searchValue = debouncedSearch?.toLowerCase() || ''
    return (
      member.name.toLowerCase().includes(searchValue) ||
      member.document?.includes(searchValue)
    )
  })

  useEffect(() => {
    async function getMembers() {
      try {
        const members = await memberApi.getAll()

        setMembers(members)
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
        setMembers([])
      }
    }

    getMembers()
  }, [])

  const handleOpenAddForm = () => {
    setMemberToEdit(null)
    setFormOperation('add')
    setOpenForm(true)
  }

  const handleCloseForm = (data?: Member) => {
    if (data) {
      if (formOperation === 'edit') {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === data.id ? { ...member, ...data } : member
          )
        )

        return
      }

      setMembers((prevMembers) => [...prevMembers, data])
    }

    setOpenForm(false)
  }

  const handleOpenEditForm = (id: number) => {
    setFormOperation('edit')
    const member = members.find((member) => member.id === id)

    if (member) {
      setMemberToEdit(member)
    }

    setOpenForm(true)
  }

  const handleDeleteMember = (id: number) => {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.'
    )

    if (confirm) {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      )
    }

    if (memberToEdit?.id === id) {
      setOpenForm(false)
      setMemberToEdit(null)
    }
  }

  return (
    <Fragment>
      <Grid container size={12} spacing={isMobile ? 4 : 8} alignItems="center">
        <Grid size="grow" display="flex" alignItems="center">
          <Stack spacing={0} flexWrap="wrap" width="100%">
            <Typography variant="h6" color="text.primary">
              Controle de Alunos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Crie, edite e exclua os seus alunos.
            </Typography>
          </Stack>
        </Grid>
        <Grid
          size={{
            mobile: 12,
            tablet: 6,
            laptop: 5,
            desktop: 3,
          }}
        >
          <Controller
            name="searchTerm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Pesquisa"
                variant="standard"
                size="small"
                fullWidth
                placeholder="Digite um nome ou CPF"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton disabled>
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={12} spacing={1}>
          {isMobile && (
            <Stack spacing={2}>
              {filteredMembers?.map((member) => (
                <MembersCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  paymentPlan={member.paymentPlan}
                  email={member.email}
                  handleOpenEdit={handleOpenEditForm}
                />
              ))}
            </Stack>
          )}

          {isBiggerThanMobile && (
            <MembersTable
              data={filteredMembers || []}
              handleDelete={handleDeleteMember}
              handleEdit={handleOpenEditForm}
            />
          )}
        </Grid>
      </Grid>

      {isMobile && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={handleOpenAddForm}
        >
          <Add />
        </Fab>
      )}

      <MemberForm
        key={memberToEdit?.id || 'new-member-form'}
        open={openForm}
        handleClose={handleCloseForm}
        isDrawer={isMobile}
        operation={formOperation}
        member={memberToEdit}
        handleDelete={handleDeleteMember}
      />
    </Fragment>
  )
}
