import { Address, Class, ClassStatus, Member } from '@/types'

function createMany<T>(factory: (index: number) => T, quantity: number): T[] {
  return Array.from({ length: quantity }, (_, i) => factory(i))
}

export const mockAddresses = createMany<Address>(
  (index) => ({
    street: `Rua ${index + 1}`,
    number: `${index + 1}`,
    district: `Bairro ${index + 1}`,
    city: `Cidade ${index + 1}`,
    state: `Estado ${index + 1}`,
    zipCode: `12345-678${index}`,
  }),
  20
)

export const existingDistricts = Array.from(
  new Set(mockAddresses.map((address) => address.district))
)

export const existingCities = Array.from(
  new Set(mockAddresses.map((address) => address.city))
)

export const existingStates = Array.from(
  new Set(mockAddresses.map((address) => address.state))
)

export const mockPaymentPlans = ['Mensal', 'Trimestral', 'Anual']

export const mockClassTypes = [
  'Yoga',
  'Pilates',
  'Musculação',
  'Zumba',
  'Crossfit',
]

export const mockClassStatus = Object.values(ClassStatus)

const generateRandomCPF = (): string => {
  const digits = Array.from({ length: 11 }, () =>
    Math.floor(Math.random() * 10)
  ).join('')
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`
}

export const mockMembers = createMany<Member>(
  (index) => ({
    id: index + 1,
    name: `Membro ${index + 1}`,
    email: `membro${index + 1}@example.com`,
    birthDate: new Date(2000 + index, 0, 1),
    document: generateRandomCPF(),
    address: mockAddresses[index % mockAddresses.length],
    paymentPlan: mockPaymentPlans[index % mockPaymentPlans.length],
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  100
)

export const mockClasses = createMany<Class>(
  (index) => ({
    id: index + 1,
    description: `Aula ${index + 1}`,
    maxCapacity: Math.floor(Math.random() * 30) + 20,
    allowLateRegistration: index % 2 === 0,
    date: new Date(2025, 7, 4),
    status: mockClassStatus[index % mockClassStatus.length],
    type: mockClassTypes[index % mockClassTypes.length],
    createdAt: new Date(),
    updatedAt: new Date(),
    members: mockMembers.slice(0, Math.floor(Math.random() * 20) + 1),
  }),
  20
)
