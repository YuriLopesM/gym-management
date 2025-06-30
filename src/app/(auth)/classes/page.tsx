'use client'

import { Fragment, useState } from 'react'

import { useBreakpoint } from '@/hooks'

import { ClassRow } from '@/components'
import { AddClassForm, FilterDrawer } from './components'

import { Add, FilterAlt } from '@mui/icons-material'
import { Button, Fab, Grid, Stack, Typography } from '@mui/material'

import { ClassStatus } from '@/types'

export default function Classes() {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [openAddClassDrawer, setOpenAddClassDrawer] = useState(false)

  const { isSmallerThanLaptop, isMobile } = useBreakpoint()

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

  return (
    <Fragment>
      <Grid size={{ mobile: 12, tablet: 12, laptop: 6 }} margin="auto">
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
          <button onClick={handleOpenAddClassDrawer}>teste</button>
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
          startTime={new Date()}
          status={ClassStatus.ON_GOING}
          type="Yoga"
        />
        <ClassRow
          id="2"
          description="Aula de Musculação"
          maxCapacity={25}
          currentCapacity={25}
          startTime={new Date('2025-06-30T10:00:00Z')}
          status={ClassStatus.FULL}
          type="Musculação"
        />
        <ClassRow
          id="3"
          description="Aula de Pilates"
          maxCapacity={15}
          currentCapacity={10}
          startTime={new Date('2025-07-01T10:00:00Z')}
          status={ClassStatus.OPEN}
          type="Pilates"
        />
        <ClassRow
          id="4"
          description="Aula de Zumba"
          maxCapacity={30}
          currentCapacity={20}
          startTime={new Date('2025-07-02T10:00:00Z')}
          status={ClassStatus.FINISHED}
          type="Zumba"
        />
        <ClassRow
          id="5"
          description="Aula de Crossfit"
          maxCapacity={15}
          currentCapacity={5}
          startTime={new Date('2025-07-03T10:00:00Z')}
          status={ClassStatus.CANCELED}
          type="Crossfit"
        />
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
      />
      <AddClassForm
        open={openAddClassDrawer}
        isDrawer={isMobile}
        handleClose={handleCloseAddClassDrawer}
      />
    </Fragment>
  )
}
