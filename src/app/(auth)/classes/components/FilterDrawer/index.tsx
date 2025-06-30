'use client'
import { DatePicker } from '@/components'
import { Button, Drawer, FormControl, Stack, Typography } from '@mui/material'
import { Controller, type Control } from 'react-hook-form'

import dayjs from 'dayjs'

interface FilterDrawerProps {
  open: boolean
  dateController: Control
  handleClose: () => void
  handleSubmit: () => void
}

export function FilterDrawer({
  open,
  dateController,
  handleClose,
  handleSubmit,
}: FilterDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Stack spacing={6} my={4} px={2} width="100%">
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Filtros
        </Typography>
        <Stack spacing={2}>
          <Controller
            name="date"
            control={dateController}
            render={({ field }) => (
              <FormControl sx={{ mt: 2 }}>
                <DatePicker
                  {...field}
                  label="Data da aula"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.toDate())}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </FormControl>
            )}
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Aplicar Filtros
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}
