import { Member } from '@/types'
import { STORAGE_KEYS } from '../constants'
import * as h from '../handlers'

export const memberApi = {
  getAll: () => h.getAll<Member>(STORAGE_KEYS.MEMBERS),
  get: (id: number) => h.get<Member>(STORAGE_KEYS.MEMBERS, id),
  create: (m: Member) => h.create(STORAGE_KEYS.MEMBERS, m),
  update: (m: Member) => h.update(STORAGE_KEYS.MEMBERS, m),
}
