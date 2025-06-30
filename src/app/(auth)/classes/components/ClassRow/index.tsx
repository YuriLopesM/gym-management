import { Class, ClassStatus } from '@/types'
import { Grid, Stack, Typography, useTheme } from '@mui/material'

import { formatDateToText } from '@/utils/date'
import { useRouter } from 'next/navigation'
import { StatusTag } from './StatusTag'

interface ClassRowProps
  extends Pick<
    Class,
    'id' | 'description' | 'maxCapacity' | 'date' | 'status' | 'type'
  > {
  currentCapacity: number
}

export function ClassRow({
  id,
  description,
  maxCapacity,
  currentCapacity,
  date,
  status,
  type,
}: ClassRowProps) {
  const theme = useTheme()
  const router = useRouter()

  const isOnGoing = status === ClassStatus.ON_GOING

  return (
    <Grid
      container
      size={{
        mobile: 12,
        tablet: 6,
        laptop: 4,
        desktop: 3,
      }}
      spacing={{
        mobile: 1,
        tablet: 2,
        laptop: 3,
        desktop: 4,
      }}
      px={2}
      pt={2}
      pb={1}
      borderRadius={1}
      border={
        isOnGoing
          ? `2px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.grey[300]}`
      }
      alignItems="center"
      onClick={() => router.push(`/classes/${id}`)}
    >
      <Grid size={12} display="flex" justifyItems="space-between">
        <Grid size="grow">
          <Stack spacing={0}>
            <Typography variant="body2" color="text.primary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {type}
            </Typography>
          </Stack>
        </Grid>
        <Grid size="auto">
          <Typography
            variant="caption"
            color="text.primary"
            justifySelf="flex-end"
          >
            {currentCapacity}{' '}
            <Typography variant="caption" color="text.secondary">
              {`/ ${maxCapacity}`}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        size={12}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="caption" color="text.secondary">
          {formatDateToText(date)}
        </Typography>
        <StatusTag status={status} />
      </Grid>
    </Grid>
  )
}
