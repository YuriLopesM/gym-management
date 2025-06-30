import { BaseEntity } from '@/types'
import { getFromStorage, saveToStorage } from './api'

export function get<T extends BaseEntity>(
  key: string,
  id: number
): Promise<T | null> {
  return new Promise((resolve) => {
    const data = getFromStorage<T>(key)
    const item = data.find((m) => m.id === id) || null
    resolve(item)
  })
}

export function getAll<T>(key: string): Promise<T[]> {
  return new Promise((resolve) => {
    const data = getFromStorage<T>(key)
    resolve(data)
  })
}

export function create<T>(key: string, newItem: T): Promise<void> {
  return new Promise((resolve) => {
    const data = getFromStorage<T>(key)
    data.push(newItem)
    saveToStorage<T>(key, data)
    resolve()
  })
}

export function update<T extends BaseEntity>(
  key: string,
  editedItem: T
): Promise<void> {
  return new Promise((resolve) => {
    const data = getFromStorage<T>(key)
    const index = data.findIndex((m) => m.id === editedItem.id)

    if (index !== -1) {
      data[index] = editedItem
      saveToStorage(key, data)
    }
    resolve()
  })
}
