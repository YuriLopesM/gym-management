'use client'

import { Fragment, useEffect, useState } from 'react'

import { useBreakpoint } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { DatePicker } from '@/components'
import { ClassForm, ClassRow, FilterDrawer } from './components'

import { Add, FilterAlt } from '@mui/icons-material'
import {
  Button,
  Fab,
  FormControl,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import { z } from 'zod'

import { Class } from '@/types'
import dayjs from 'dayjs'

import { setupMocks } from '@/mocks'
import { classApi } from '@/mocks/api/class'

interface FormData {
  date?: Date
}

const schema = z.object({
  date: z.date().optional(),
})

export default function Classes() {
  useEffect(setupMocks, [])

  const { isSmallerThanLaptop, isBiggerThanMobile, isMobile } = useBreakpoint()

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldUnregister: true,
  })
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [classes, setClasses] = useState<Class[]>([])

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)

  const [openForm, setOpenForm] = useState(false)

  const handleOpenFilterDrawer = () => {
    setOpenFilterDrawer(true)
  }

  const handleCloseFilterDrawer = () => {
    setOpenFilterDrawer(false)
  }

  const handleOpenForm = () => {
    setOpenForm(true)
  }

  const handleCloseForm = (data?: Class) => {
    if (data) {
      setClasses((prevClasses) => [...prevClasses, data])
    }

    setOpenForm(false)
  }

  const handleApplyFilters = ({ date }: FormData) => {
    setDate(date)
    handleCloseFilterDrawer()
  }

  useEffect(() => {
    const getAllClasses = async () => {
      try {
        const classes = await classApi.getByDate(date)

        setClasses(classes)
      } catch (error) {
        console.error('Error fetching classes:', error)
      }
    }

    getAllClasses()
  }, [date])

  return (
    <Fragment>
      <Grid
        size={{ mobile: 12, tablet: 12, laptop: 6 }}
        margin="auto"
        display="flex"
        alignItems="center"
      >
        <Stack spacing={0} flexWrap="wrap" width="100%">
          <Typography variant="h6" color="text.primary">
            Olá Yuri, como vai? 😉
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Veja as aulas e controle sua academia.
          </Typography>
        </Stack>
      </Grid>
      <Grid
        size={{ mobile: 12, tablet: 12, laptop: 6 }}
        display="flex"
        justifyContent="flex-end"
      >
        {isSmallerThanLaptop ? (
          <Button
            type="button"
            variant="outlined"
            startIcon={<FilterAlt />}
            onClick={handleOpenFilterDrawer}
          >
            Filtros
          </Button>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ mt: 2 }}>
                  <DatePicker
                    {...field}
                    label="Data da aula"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.toDate())}
                    slotProps={{ textField: { size: 'small' } }}
                    sx={{ width: '200px' }}
                  />
                </FormControl>
              )}
            />
            <Button
              type="button"
              color="primary"
              endIcon={<FilterAlt />}
              variant="contained"
              size="small"
              onClick={handleSubmit(handleApplyFilters)}
              sx={{
                width: 'fit-content',
                minWidth: '150px',
                height: '40px',
              }}
            >
              Aplicar Filtros
            </Button>
          </Stack>
        )}
      </Grid>
      <Stack
        spacing={2}
        width="100%"
        useFlexGap
        direction={{
          mobile: 'column',
          tablet: 'row',
        }}
        mt={6}
        sx={{ flexWrap: 'wrap' }}
      >
        {classes.length > 0 &&
          classes.map(
            ({ id, description, maxCapacity, date, status, type, members }) => (
              <ClassRow
                key={id}
                id={id}
                description={description}
                maxCapacity={maxCapacity}
                currentCapacity={members?.length || 0}
                date={new Date(date)}
                status={status}
                type={type}
              />
            )
          )}

        {classes.length === 0 && (
          <Grid
            size={12}
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
            height="400px"
          >
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              Nenhuma aula encontrada. Comece{' '}
              <Typography
                color="primary.main"
                component="span"
                onClick={handleOpenForm}
              >
                adicionando sua primeira aula.
              </Typography>
            </Typography>
          </Grid>
        )}

        {isBiggerThanMobile && classes.length > 0 && (
          <Grid
            size={{
              tablet: 6,
              laptop: 4,
              desktop: 3,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<Add />}
              onClick={handleOpenForm}
              fullWidth
              sx={{ height: '100%' }}
            >
              Adicionar Aula
            </Button>
          </Grid>
        )}
      </Stack>
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={handleOpenForm}
        >
          <Add />
        </Fab>
      )}

      <FilterDrawer
        open={openFilterDrawer}
        handleClose={handleCloseFilterDrawer}
        handleSubmit={handleSubmit(handleApplyFilters)}
        dateController={control}
      />
      <ClassForm
        open={openForm}
        isDrawer={isMobile}
        operation="add"
        classData={null}
        handleClose={handleCloseForm}
      />
    </Fragment>
  )
}
