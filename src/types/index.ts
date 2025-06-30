export interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface Class extends BaseEntity {
  description: string
  maxCapacity: number
  allowLateRegistration: boolean
  date: Date
  status: ClassStatusType
  type: string
  members?: Member[]
}

export interface Member extends User {
  paymentPlan: string
}

export interface User extends BaseEntity {
  name: string
  email: string
  birthDate: Date
  document?: string
  address?: Address
}

export interface Address {
  street: string
  number: string
  district: string
  city: string
  state: string
  zipCode: string
}

export const ClassStatus = {
  ON_GOING: 'Em andamento',
  OPEN: 'Aberta',
  FULL: 'Grupo fechado',
  FINISHED: 'Finalizada',
  CANCELED: 'Cancelada',
} as const

export type ClassStatusType = (typeof ClassStatus)[keyof typeof ClassStatus]

export type FormOperation = 'add' | 'edit'
