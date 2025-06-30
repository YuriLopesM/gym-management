'use client'

import { Fragment, useState } from 'react'

import { useBreakpoint } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { DatePicker } from '@/components'
import { AddClassForm, ClassRow, FilterDrawer } from './components'

import { Add, FilterAlt } from '@mui/icons-material'
import {
  Button,
  Fab,
  FormControl,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import * as z from 'zod'

import { ClassStatus } from '@/types'
import dayjs from 'dayjs'

interface FormData {
  date?: Date
}

const schema = z.object({
  date: z.date().optional(),
})

export default function Classes() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldUnregister: true,
  })

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [openAddClassDrawer, setOpenAddClassDrawer] = useState(false)

  const { isSmallerThanLaptop, isBiggerThanMobile, isMobile } = useBreakpoint()

  const handleOpenFilterDrawer = () => {
    setOpenFilterDrawer(true)
  }

  const handleCloseFilterDrawer = () => {
    setOpenFilterDrawer(false)
  }

  const handleOpenAddClassDrawer = () => {
    setOpenAddClassDrawer(true)
  }

  const handleCloseAddClassDrawer = () => {
    setOpenAddClassDrawer(false)
  }

  const handleApplyFilters = (data: FormData) => {
    console.log('Applied Filters:', data)
    handleCloseFilterDrawer()
  }

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
          laptop: 'row',
          desktop: 'row',
        }}
        sx={{ flexWrap: 'wrap' }}
      >
        <ClassRow
          id="1"
          description="Aula de Yoga"
          maxCapacity={20}
          currentCapacity={15}
          date={new Date()}
          status={ClassStatus.ON_GOING}
          type="Yoga"
        />
        <ClassRow
          id="2"
          description="Aula de Musculação"
          maxCapacity={25}
          currentCapacity={25}
          date={new Date('2025-06-30T10:00:00Z')}
          status={ClassStatus.FULL}
          type="Musculação"
        />
        <ClassRow
          id="3"
          description="Aula de Pilates"
          maxCapacity={15}
          currentCapacity={10}
          date={new Date('2025-07-01T10:00:00Z')}
          status={ClassStatus.OPEN}
          type="Pilates"
        />
        <ClassRow
          id="4"
          description="Aula de Zumba"
          maxCapacity={30}
          currentCapacity={20}
          date={new Date('2025-07-02T10:00:00Z')}
          status={ClassStatus.FINISHED}
          type="Zumba"
        />
        <ClassRow
          id="5"
          description="Aula de Crossfit"
          maxCapacity={15}
          currentCapacity={5}
          date={new Date('2025-07-03T10:00:00Z')}
          status={ClassStatus.CANCELED}
          type="Crossfit"
        />
        {isBiggerThanMobile && (
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
              onClick={handleOpenAddClassDrawer}
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
          onClick={handleOpenAddClassDrawer}
        >
          <Add />
        </Fab>
      )}

      <FilterDrawer
        open={openFilterDrawer}
        handleClose={handleCloseFilterDrawer}
        handleSubmit={handleSubmit(handleApplyFilters)}
      />
      <AddClassForm
        open={openAddClassDrawer}
        isDrawer={isMobile}
        handleClose={handleCloseAddClassDrawer}
      />
    </Fragment>
  )
}
