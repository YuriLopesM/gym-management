'use client'

import { useBreakpoint } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { DateTimePicker } from '@/components'

import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'

import dayjs from 'dayjs'
import * as z from 'zod'

import { Class, ClassStatus } from '@/types'

interface AddClassFormProps {
  open: boolean
  isDrawer: boolean
  handleClose: () => void
}

type FormData = Pick<
  Class,
  | 'description'
  | 'maxCapacity'
  | 'date'
  | 'type'
  | 'status'
  | 'allowLateRegistration'
>

const modalContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 3,
}

const drawerContainerStyle = {
  px: 4,
  pt: 4,
  pb: 6,
}

const schema = z.object({
  description: z
    .string()
    .trim()
    .min(1, 'Descrição é obrigatória')
    .max(25, 'Descrição deve ter no máximo 25 caracteres'),
  maxCapacity: z.coerce
    .number()
    .min(1, 'Capacidade máxima deve ser maior que 0')
    .max(25, 'Capacidade máxima deve ser menor ou igual a 25'),
  date: z.date().refine((date) => date > new Date(), {
    message: 'A data/hora de início deve ser no futuro',
  }),
  type: z.string().min(1, 'Tipo de aula é obrigatório'),
  status: z.nativeEnum(ClassStatus, {
    message: 'Status inválido',
  }),
  allowLateRegistration: z.boolean(),
})

export function AddClassForm({
  open,
  isDrawer,
  handleClose,
}: AddClassFormProps) {
  const { isBiggerThanTablet } = useBreakpoint()

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      description: '',
      maxCapacity: 10,
      date: new Date(),
      type: '',
      status: ClassStatus.OPEN,
      allowLateRegistration: true,
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldUnregister: true,
  })

  const onSubmit = (data: FormData) => console.log(data)

  return (
    <Box
      component={isDrawer ? Drawer : Modal}
      anchor="bottom"
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Grid
        container
        sx={isDrawer ? drawerContainerStyle : modalContainerStyle}
        spacing={4}
        width={{
          mobile: '100%',
          tablet: '80%',
          laptop: '50%',
          desktop: '30%',
        }}
      >
        <Grid size={2}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
        <Grid size={10}>
          <Typography variant="h6" color="text.primary" textAlign="right">
            Adicionar Aula
          </Typography>
        </Grid>
        <Grid
          size={{
            mobile: 12,
            laptop: 6,
          }}
        >
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                autoFocus
                fullWidth
                type="text"
                label="Descrição"
                variant="standard"
                placeholder="Ex: Aula de Pilates"
                aria-invalid={!!fieldState.error}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
            )}
          />
        </Grid>
        <Grid
          size={{
            mobile: 12,
            laptop: 6,
          }}
        >
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl required fullWidth variant="standard">
                <InputLabel id="select-type">Tipo de aula</InputLabel>
                <Select
                  {...field}
                  fullWidth
                  labelId="select-type"
                  label="Tipo de Aula"
                  error={!!fieldState.error}
                  aria-invalid={!!fieldState.error}
                >
                  <MenuItem value="Yoga">Yoga</MenuItem>
                  <MenuItem value="Pilates">Pilates</MenuItem>
                  <MenuItem value="Musculação">Musculação</MenuItem>
                  <MenuItem value="Dança">Dança</MenuItem>
                  <MenuItem value="Cardio">Cardio</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          size={{
            mobile: 12,
            laptop: 6,
          }}
        >
          <Controller
            name="maxCapacity"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Capacidade máxima"
                variant="standard"
                placeholder="Ex: 20"
                aria-invalid={!!fieldState.error}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
                slotProps={{
                  input: {
                    type: 'number',
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid
          size={{
            mobile: 12,
            laptop: 6,
          }}
        >
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl required fullWidth variant="standard">
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                  {...field}
                  labelId="select-status"
                  label="Status"
                  error={!!fieldState.error}
                  aria-invalid={!!fieldState.error}
                >
                  <MenuItem value={ClassStatus.OPEN}>
                    {ClassStatus.OPEN}
                  </MenuItem>
                  <MenuItem value={ClassStatus.ON_GOING}>
                    {ClassStatus.ON_GOING}
                  </MenuItem>
                  <MenuItem value={ClassStatus.FULL}>
                    {ClassStatus.FULL}
                  </MenuItem>
                  <MenuItem value={ClassStatus.CANCELED}>
                    {ClassStatus.CANCELED}
                  </MenuItem>
                  <MenuItem value={ClassStatus.FINISHED}>
                    {ClassStatus.FINISHED}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                required
                fullWidth
                error={!!fieldState.error}
                sx={{ mt: 2 }}
              >
                <DateTimePicker
                  {...field}
                  label="Data e hora de início"
                  aria-invalid={!!fieldState.error}
                  value={dayjs(field.value)}
                  onChange={(date) => field.onChange(date?.toDate())}
                />
                {fieldState.error && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          size={12}
          sx={
            isBiggerThanTablet
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }
              : { display: 'flex', justifyContent: 'center' }
          }
        >
          <Controller
            name="allowLateRegistration"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} />}
                label="Permite inscrição após o início"
              />
            )}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isDirty}
        >
          Adicionar aula
        </Button>
      </Grid>
    </Box>
  )
}
