'use client'

import { useState } from 'react'

import { ClassRow, DatePicker } from '@/components'
import { useBreakpoint } from '@/hooks'

import { FilterAlt } from '@mui/icons-material'
import { Button, Drawer, Grid, Stack, Typography } from '@mui/material'

import { ClassStatus } from '@/types'

export default function Classes() {
  const [openFilterMenu, setOpenFilterMenu] = useState(false)
  const { isSmallerThanLaptop } = useBreakpoint()

  const handleOpenFilterMenu = () => {
    setOpenFilterMenu(true)
  }

  const handleCloseFilterMenu = () => {
    setOpenFilterMenu(false)
  }

  return (
    <Grid
      container
      maxWidth="100%"
      component="main"
      spacing={2}
      margin={{
        mobile: '24px auto',
        laptop: '32px auto',
      }}
      padding={{
        mobile: '0 32px',
        laptop: '0 64px',
        desktop: '0 128px',
      }}
    >
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
          <>
            <Button
              type="button"
              variant="outlined"
              startIcon={<FilterAlt />}
              onClick={handleOpenFilterMenu}
            >
              Filtros
            </Button>
            <Drawer
              anchor="right"
              open={openFilterMenu}
              onClose={handleCloseFilterMenu}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <Stack spacing={6} my={4} px={2} width="100%">
                <Typography
                  variant="h6"
                  color="text.secondary"
                  textAlign="center"
                >
                  Filtros
                </Typography>
                <Stack spacing={2}>
                  <DatePicker />
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleCloseFilterMenu}
                  >
                    Aplicar Filtros
                  </Button>
                </Stack>
              </Stack>
            </Drawer>
          </>
        ) : (
          <>teste</>
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
          status={ClassStatus.CANCELLED}
          type="Crossfit"
        />
      </Stack>
    </Grid>
  )
}
