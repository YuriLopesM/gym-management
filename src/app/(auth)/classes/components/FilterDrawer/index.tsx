import { DatePicker } from '@/components'
import { Button, Drawer, Stack, Typography } from '@mui/material'

interface FilterDrawerProps {
  open: boolean
  handleClose: () => void
  handleSubmit: () => void
}

export function FilterDrawer({
  open,
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
          <DatePicker />
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
