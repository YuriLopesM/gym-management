'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { DatePicker } from '@/components'

import { Close, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  FormControl,
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
import { z } from 'zod'

import {
  existingCities,
  existingDistricts,
  existingStates,
  mockPaymentPlans,
} from '@/mocks'
import { memberApi } from '@/mocks/api/member'
import { FormOperation, Member } from '@/types'

interface MemberFormProps {
  open: boolean
  isDrawer: boolean
  operation: FormOperation
  member: Member | null
  handleClose: (data?: Member) => void
  handleDelete: (id: number) => void
}

type FormData = Omit<Member, 'id' | 'createdAt' | 'updatedAt'>

const modalContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 6,
}

const drawerContainerStyle = {
  px: 4,
  pt: 4,
  pb: 6,
}

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  birthDate: z.date().refine((date) => date < new Date(), {
    message: 'A data de nascimento deve ser no passado',
  }),
  document: z.string().optional(),
  paymentPlan: z.string(),
  address: z
    .object({
      zipCode: z.string(),
      street: z.string(),
      number: z.string(),
      district: z.string(),
      city: z.string(),
      state: z.string(),
    })
    .optional(),
})

export function MemberForm({
  open,
  isDrawer,
  operation,
  member,
  handleClose,
  handleDelete,
}: MemberFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: member || {
      name: '',
      email: '',
      birthDate: new Date(),
      document: '',
      paymentPlan: 'Mensal',
      address: {
        zipCode: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
      },
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldUnregister: true,
  })

  const updateMember = async (data: Member) => {
    try {
      await memberApi.update(data)
      alert('Aluno atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error)
    }
  }

  const createMember = async (data: Member) => {
    try {
      await memberApi.create(data)
      alert('Aluno criado com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error)
    }
  }

  const onSubmit = (data: FormData) => {
    if (operation === 'edit' && member) {
      const editedData: Member = {
        ...member,
        ...data,
        updatedAt: new Date(),
      }

      updateMember(editedData)

      return handleClose(editedData)
    }

    const newData: Member = {
      ...data,
      id: Date.now(), // ID simples para exemplo
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    createMember(newData)

    handleClose(newData)
  }

  return (
    <Box
      component={isDrawer ? Drawer : Modal}
      anchor="bottom"
      open={open}
      onClose={() => handleClose()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Grid
        container
        sx={isDrawer ? drawerContainerStyle : modalContainerStyle}
        spacing={2}
        width={{
          mobile: '100%',
          tablet: '80%',
          laptop: '50%',
          desktop: '30%',
        }}
      >
        <Grid size={2}>
          <IconButton onClick={() => handleClose()}>
            <Close />
          </IconButton>
        </Grid>
        <Grid size={10}>
          <Typography variant="h6" color="text.primary" textAlign="right">
            {operation === 'add' ? 'Adicionar' : 'Editar'} Aluno
          </Typography>
        </Grid>
        <Grid
          size={{
            mobile: 12,
            laptop: 6,
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                autoFocus
                fullWidth
                type="text"
                label="Nome"
                variant="standard"
                placeholder="Digite o nome completo"
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
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                fullWidth
                type="email"
                label="Email"
                variant="standard"
                placeholder="Digite o email"
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
            name="document"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="text"
                label="CPF"
                variant="standard"
                placeholder="Ex: 123.456.789-00"
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
            name="paymentPlan"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl required fullWidth variant="standard">
                <InputLabel id="select-payment-plan">Tipo de Plano</InputLabel>
                <Select
                  {...field}
                  fullWidth
                  labelId="select-payment-plan"
                  label="Tipo de Aula"
                  error={!!fieldState.error}
                  aria-invalid={!!fieldState.error}
                >
                  {mockPaymentPlans.map((plan) => (
                    <MenuItem key={plan} value={plan}>
                      {plan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                required
                fullWidth
                error={!!fieldState.error}
                sx={{ mt: 2 }}
              >
                <DatePicker
                  {...field}
                  label="Data de Nascimento"
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

        <Accordion
          sx={{ width: '100%', mb: 2, padding: 0 }}
          elevation={0}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography component="span">Endereço</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container size={12} spacing={2}>
              <Grid size={6}>
                <Controller
                  name="address.zipCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="text"
                      label="CEP"
                      variant="standard"
                      placeholder="Ex: 12345-678"
                      aria-invalid={!!fieldState.error}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ''
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={6}>
                <Controller
                  name="address.state"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="select-state">UF</InputLabel>
                      <Select
                        {...field}
                        fullWidth
                        labelId="select-state"
                        error={!!fieldState.error}
                        aria-invalid={!!fieldState.error}
                      >
                        {existingStates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={6}>
                <Controller
                  name="address.city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="select-city">Cidade</InputLabel>
                      <Select
                        {...field}
                        fullWidth
                        labelId="select-city"
                        error={!!fieldState.error}
                        aria-invalid={!!fieldState.error}
                      >
                        {existingCities.map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={6}>
                <Controller
                  name="address.district"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="select-district">Bairro</InputLabel>
                      <Select
                        {...field}
                        fullWidth
                        labelId="select-district"
                        error={!!fieldState.error}
                        aria-invalid={!!fieldState.error}
                      >
                        {existingDistricts.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid
                size={{
                  mobile: 9,
                }}
              >
                <Controller
                  name="address.street"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="text"
                      label="Rua"
                      variant="standard"
                      placeholder="Ex: Rua das Flores"
                      aria-invalid={!!fieldState.error}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ''
                      }
                    />
                  )}
                />
              </Grid>

              <Grid
                size={{
                  mobile: 3,
                }}
              >
                <Controller
                  name="address.number"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Número"
                      variant="standard"
                      placeholder="Ex: 1337"
                      aria-invalid={!!fieldState.error}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ''
                      }
                      slotProps={{
                        input: {
                          type: 'number',
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isDirty}
        >
          {operation === 'add' ? 'Adicionar' : 'Editar'} aluno
        </Button>
        {operation === 'edit' && member && (
          <Button
            type="button"
            fullWidth
            variant="outlined"
            size="large"
            color="error"
            onClick={() => handleDelete(member.id)}
          >
            Excluir aluno
          </Button>
        )}
      </Grid>
    </Box>
  )
}
