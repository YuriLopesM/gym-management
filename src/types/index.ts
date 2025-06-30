export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface Class extends BaseEntity {
  description: string
  maxCapacity: number
  allowLateRegistration: boolean
  startTime: Date
  endTime: Date
  status: ClassStatusType
  type: string
}

export const ClassStatus = {
  ON_GOING: 'Em andamento',
  OPEN: 'Aberta',
  FULL: 'Grupo fechado',
  FINISHED: 'Finalizada',
  CANCELLED: 'Cancelada',
} as const

export type ClassStatusType = (typeof ClassStatus)[keyof typeof ClassStatus]
