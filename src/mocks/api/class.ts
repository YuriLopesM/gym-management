import { Class, Member } from '@/types'
import dayjs from 'dayjs'
import { STORAGE_KEYS } from '../constants'
import * as h from '../handlers'

export const classApi = {
  getAll: () => h.getAll<Class>(STORAGE_KEYS.CLASSES),
  get: (id: number) => h.get<Class>(STORAGE_KEYS.CLASSES, id),
  create: (c: Class) => h.create(STORAGE_KEYS.CLASSES, c),
  update: (c: Class) => h.update(STORAGE_KEYS.CLASSES, c),
  getByDate: async (date?: Date) => {
    if (!date) {
      return h.getAll<Class>(STORAGE_KEYS.CLASSES)
    }

    const classes = await h.getAll<Class>(STORAGE_KEYS.CLASSES)
    return classes.filter((c) => dayjs(c.date).isSame(dayjs(date), 'day'))
  },
  addMembers: async (classId: number, members: Member[]) => {
    const classes = await h.getAll<Class>(STORAGE_KEYS.CLASSES)
    const classToUpdate = classes.find((c) => c.id === classId)

    if (!classToUpdate) {
      throw new Error(`Class with ID ${classId} not found.`)
    }

    classToUpdate.members = [...(classToUpdate.members || []), ...members]

    return h.update(STORAGE_KEYS.CLASSES, classToUpdate)
  },
  removeMember: async (classId: number, memberId: number) => {
    const classes = await h.getAll<Class>(STORAGE_KEYS.CLASSES)
    const classToUpdate = classes.find((c) => c.id === classId)

    if (!classToUpdate) {
      throw new Error(`Class with ID ${classId} not found.`)
    }

    classToUpdate.members = classToUpdate.members?.filter(
      (m) => m.id !== memberId
    )

    return h.update(STORAGE_KEYS.CLASSES, classToUpdate)
  },
}
