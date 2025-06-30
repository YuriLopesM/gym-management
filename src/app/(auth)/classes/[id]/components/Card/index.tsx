import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { ReactNode } from 'react'

interface CardProps {
  title: string
  description?: string
  icon: ReactNode
}

export function Card({ title, description, icon }: CardProps) {
  const theme = useTheme()

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
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={2}
    >
      <Stack spacing={0}>
        <Typography variant="body1" color="text.primary">
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Stack>
      {icon}
    </Grid>
  )
}
