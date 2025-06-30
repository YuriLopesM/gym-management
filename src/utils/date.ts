import dayjs from 'dayjs'

export function formatDateToText(date: Date) {
  const isToday = dayjs(date).date() === dayjs().date()
  const isTomorrow = dayjs(date).date() === dayjs().add(1, 'day').date()

  if (isToday) {
    return `Hoje, ${dayjs(date).format('HH:mm')}`
  }

  if (isTomorrow) {
    return `Amanhã, ${dayjs(date).format('HH:mm')}`
  }

  return dayjs(date).format('DD/MM/YY [às] HH:mm')
}
