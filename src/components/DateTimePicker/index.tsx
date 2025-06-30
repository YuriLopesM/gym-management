'use client'

import {
  type DateTimePickerProps,
  LocalizationProvider,
  DateTimePicker as MuiDateTimePicker,
} from '@mui/x-date-pickers'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/pt-br'

export function DateTimePicker(props?: DateTimePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <MuiDateTimePicker {...props} />
    </LocalizationProvider>
  )
}
