import { getFromStorage, saveToStorage } from './api'
import { STORAGE_KEYS } from './constants'
import {
  existingCities,
  existingDistricts,
  existingStates,
  mockClasses,
  mockClassStatus,
  mockClassTypes,
  mockMembers,
  mockPaymentPlans,
} from './data'

export function setupMocks() {
  if (getFromStorage(STORAGE_KEYS.MEMBERS).length === 0) {
    saveToStorage(STORAGE_KEYS.MEMBERS, mockMembers)
  }
  if (getFromStorage(STORAGE_KEYS.CLASSES).length === 0) {
    saveToStorage(STORAGE_KEYS.CLASSES, mockClasses)
  }
  if (getFromStorage(STORAGE_KEYS.STATES).length === 0) {
    saveToStorage(STORAGE_KEYS.STATES, existingStates)
  }
  if (getFromStorage(STORAGE_KEYS.CITIES).length === 0) {
    saveToStorage(STORAGE_KEYS.CITIES, existingCities)
  }
  if (getFromStorage(STORAGE_KEYS.DISTRICTS).length === 0) {
    saveToStorage(STORAGE_KEYS.DISTRICTS, existingDistricts)
  }
  if (getFromStorage(STORAGE_KEYS.PAYMENT_PLANS).length === 0) {
    saveToStorage(STORAGE_KEYS.PAYMENT_PLANS, mockPaymentPlans)
  }
  if (getFromStorage(STORAGE_KEYS.CLASS_TYPES).length === 0) {
    saveToStorage(STORAGE_KEYS.CLASS_TYPES, mockClassTypes)
  }
  if (getFromStorage(STORAGE_KEYS.CLASS_STATUS).length === 0) {
    saveToStorage(STORAGE_KEYS.CLASS_STATUS, mockClassStatus)
  }
}
