'use client'

import { useParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import { useBreakpoint } from '@/hooks'

import { MembersTable } from '@/components'
import { ClassForm } from '../components'
import { Card, StatusCard } from './components'

import { ChevronLeft, Edit, Event, Groups3 } from '@mui/icons-material'
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

import dayjs from 'dayjs'

import { Class, ClassStatus, Member } from '@/types'

import { setupMocks } from '@/mocks'
import { classApi } from '@/mocks/api/class'
import { memberApi } from '@/mocks/api/member'

export default function ClassPage() {
  useEffect(setupMocks, [])

  const { id } = useParams()
  const { isBiggerThanMobile, isMobile, isSmallerThanLaptop } = useBreakpoint()

  const [data, setData] = useState<Class>()
  const [members, setMembers] = useState<Member[]>([])
  const [newMembers, setNewMembers] = useState<string[]>([])
  const [openForm, setOpenForm] = useState(false)

  const possibleMembers = members.filter((member) =>
    data?.members?.some(
      () => data && !data.members?.some((m) => m.id === member.id)
    )
  )

  const canAddNewMembers =
    data &&
    (data.status === ClassStatus.OPEN ||
      data.status === ClassStatus.ON_GOING) &&
    data.allowLateRegistration

  const handleOpenForm = () => {
    setOpenForm(true)
  }

  const handleCloseForm = (data?: Class) => {
    if (data) {
      setData(data)
    }

    setOpenForm(false)
  }

  const formatMemberCountMessage = (count: number) => {
    if (count === 0) {
      return 'Nenhum aluno vinculado.'
    }

    if (count > 1) {
      return `${count} alunos participantes`
    }

    return `1 aluno cadastrado`
  }

  const handleDeleteMember = async (memberId: number) => {
    const confirmed = window.confirm(
      'Você tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.'
    )

    if (!confirmed) {
      return
    }

    try {
      await classApi.removeMember(Number(id), memberId)

      setData((prevData) => {
        if (!prevData) return undefined

        return {
          ...prevData,
          members: prevData.members?.filter((m) => m.id !== memberId),
        }
      })
    } catch (error) {
      console.error('Error trying to remove a member', error)
    }
  }

  const handlePreSelect = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setNewMembers(typeof value === 'string' ? value.split(',') : value)
  }

  const validateClassSize = (countNewMembers: number, data: Class) => {
    const countCurrentMembers = data.members?.length || 0
    const maxCapacity = data.maxCapacity

    if (countCurrentMembers >= maxCapacity) {
      alert(`Aula já está cheia. Máximo de ${maxCapacity} alunos atingido.`)
      return false
    }

    if (countCurrentMembers + countNewMembers > maxCapacity) {
      alert(
        `Não é possível adicionar mais alunos. Remova ${countCurrentMembers + countNewMembers - maxCapacity} aluno(s) para respeitar a capacidade máxima de ${maxCapacity} alunos.`
      )
      return false
    }

    return true
  }

  const handleAddNewMembers = async () => {
    if (!data) return

    if (newMembers.length === 0) {
      console.warn('Nenhum membro selecionado para adicionar.')
      return
    }

    try {
      const membersToAdd = newMembers.map((id) => ({ id: Number(id) }))
      const membersList = members.filter((m) =>
        membersToAdd.some((member) => member.id === m.id)
      )

      const isValidated = validateClassSize(membersToAdd.length, data)

      if (isValidated) {
        await classApi.addMembers(Number(id), membersList)

        setData((prevData) => {
          if (!prevData) return undefined

          return {
            ...prevData,
            members: [...(prevData.members ?? []), ...membersList],
          }
        })
      }
    } catch (error) {
      console.error('Erro ao adicionar membros:', error)
    } finally {
      setNewMembers([])
    }
  }

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      console.error('Class ID is required but not provided.')
      return
    }
    const getAllClasses = async () => {
      try {
        const data = await classApi.get(Number(id))

        if (data) {
          setData(data)
        }
      } catch (error) {
        console.error('Error fetching class data:', error)
      }
    }

    getAllClasses()
  }, [id])

  useEffect(() => {
    const getPossibleMembers = async () => {
      try {
        const members = await memberApi.getAll()

        setMembers(members)
      } catch (error) {
        console.error('Error fetching possible members:', error)
      }
    }
    getPossibleMembers()
  }, [])

  if (!id || isNaN(Number(id))) {
    return (
      <Grid size={12}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          ID da aula não fornecido ou inválido.
        </Typography>
      </Grid>
    )
  }

  return (
    <Fragment>
      <Grid container size={12} spacing={4}>
        <Grid size={9} spacing={4} display="flex" alignItems="center">
          <IconButton sx={{ mr: 1 }} href="/classes">
            <ChevronLeft />
          </IconButton>
          <Stack spacing={0} flexWrap="wrap" width="100%">
            <Typography variant="h6" color="text.primary">
              {data?.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Tipo de aula: {data?.type}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          size={3}
          display="flex"
          justifyContent="flex-end"
          color={'grey.600'}
        >
          <Button onClick={handleOpenForm} endIcon={<Edit />} color="inherit">
            {isBiggerThanMobile && 'Editar Aula'}
          </Button>
        </Grid>
        <Grid container size={12} spacing={1}>
          <Card
            title={dayjs(data?.date).format('DD/MM/YYYY [às] HH:mm')}
            icon={<Event sx={{ color: 'grey.400' }} />}
          />
          <Card
            title={formatMemberCountMessage(data?.members?.length || 0)}
            description={`Capacidade Máxima: ${data?.maxCapacity} alunos`}
            icon={<Groups3 sx={{ color: 'grey.400' }} />}
          />
          <StatusCard status={data?.status} />
        </Grid>
        <Grid
          container
          size={12}
          spacing={2}
          display="flex"
          mt={4}
          justifyContent={isSmallerThanLaptop ? 'center' : 'flex-start'}
        >
          {canAddNewMembers ? (
            <Fragment>
              <Grid
                size={{
                  mobile: 7,
                  tablet: 9,
                  laptop: 4,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="multiple-new-member">Alunos</InputLabel>
                  <Select
                    labelId="multiple-new-member"
                    id="multiple-new-member-select"
                    multiple
                    value={newMembers}
                    onChange={handlePreSelect}
                    variant="standard"
                  >
                    {possibleMembers.map((m) => (
                      <MenuItem key={m.id} value={m.id}>
                        {m.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                size={{
                  mobile: 5,
                  tablet: 3,
                  laptop: 2,
                }}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button
                  disabled={!newMembers}
                  variant="outlined"
                  onClick={async () => await handleAddNewMembers()}
                  fullWidth
                >
                  Adicionar
                </Button>
              </Grid>
            </Fragment>
          ) : null}
          <MembersTable
            data={data?.members || []}
            onlyBiggerScreens={isBiggerThanMobile}
            handleDelete={handleDeleteMember}
          />
        </Grid>
      </Grid>

      <ClassForm
        key={data?.id}
        open={openForm}
        isDrawer={isMobile}
        operation="edit"
        classData={data || null}
        handleClose={handleCloseForm}
      />
    </Fragment>
  )
}
