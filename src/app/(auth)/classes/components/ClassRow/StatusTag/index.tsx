'use client'
import { ClassStatusType } from '@/types'
import { Typography } from '@mui/material'

interface StatusTagProps {
  status: ClassStatusType
}

export function StatusTag({ status }: StatusTagProps) {
  const colorMap: Record<ClassStatusType, string> = {
    'Em andamento': 'primary.main',
    Aberta: 'info.main',
    'Grupo fechado': 'success.main',
    Finalizada: 'grey.500',
    Cancelada: 'error.main',
  }

  return (
    <Typography variant="overline" color={colorMap[status]}>
      {status}
    </Typography>
  )
}
