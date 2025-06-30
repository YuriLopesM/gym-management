import {
  type DatePickerProps,
  LocalizationProvider,
  DatePicker as MuiDatePicker,
} from '@mui/x-date-pickers'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/pt-br'

export function DatePicker(props?: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <MuiDatePicker {...props} />
    </LocalizationProvider>
  )
}
