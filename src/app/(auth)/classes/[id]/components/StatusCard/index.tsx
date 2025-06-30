import { ClassStatus, ClassStatusType } from '@/types'
import {
  DoneAll,
  DoNotDisturb,
  GroupAdd,
  HourglassBottom,
  RocketLaunch,
} from '@mui/icons-material'
import { Grid, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface StatusCardProps {
  status?: ClassStatusType
}

export function StatusCard({ status }: StatusCardProps) {
  const colorStatusMapping: Record<
    ClassStatusType,
    { bgColor: string; icon: ReactNode }
  > = {
    [ClassStatus.OPEN]: { bgColor: 'info.main', icon: <GroupAdd /> },
    [ClassStatus.ON_GOING]: {
      bgColor: 'primary.main',
      icon: <HourglassBottom />,
    },
    [ClassStatus.CANCELED]: {
      bgColor: 'error.main',
      icon: <DoNotDisturb />,
    },
    [ClassStatus.FINISHED]: {
      bgColor: 'success.main',
      icon: <DoneAll />,
    },
    [ClassStatus.FULL]: { bgColor: 'success.light', icon: <RocketLaunch /> },
  }

  if (!status || !colorStatusMapping[status]) {
    return null // or return a default status card
  }

  return (
    <Grid
      size={{
        mobile: 12,
        tablet: 6,
        laptop: 6,
        desktop: 3,
      }}
      py={2}
      px={2}
      minHeight="76px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor={colorStatusMapping[status].bgColor}
      color="grey.50"
      borderRadius={2}
    >
      <Stack spacing={0}>
        <Typography variant="body1">{status}</Typography>
        <Typography variant="overline" lineHeight="150%">
          Edite para alterar
        </Typography>
      </Stack>
      {colorStatusMapping[status].icon}
    </Grid>
  )
}
