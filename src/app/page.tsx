'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useBreakpoint } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  ArrowForward,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { z } from 'zod'

import { setupMocks } from '@/mocks'

interface FormData {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
})

export default function Home() {
  useEffect(setupMocks, [])

  const router = useRouter()

  const { isMobile, isDesktop, isSmallerThanLaptop } = useBreakpoint()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data)
    router.push('/classes')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const isSubmitDisabled = !isDirty || !isValid

  return (
    <Grid container height="100vh">
      <Grid size="grow">
        <Stack
          height="100%"
          alignItems="center"
          justifyContent="space-between"
          paddingBlock={{ mobile: 4, tablet: 5, laptop: 6, desktop: 8 }}
          paddingInline={{ mobile: 3, tablet: 3, laptop: 4, desktop: 6 }}
          spacing={4}
        >
          <Grid
            display="flex"
            flexDirection={{ mobile: 'column', tablet: 'row' }}
            justifyContent="center"
            alignItems="center"
            component="header"
            gap={{ mobile: 0, tablet: 1 }}
          >
            <Image
              src="/svg/logo.svg"
              alt="Logo do sistema Gym Management"
              width={isSmallerThanLaptop ? 40 : 64}
              height={isSmallerThanLaptop ? 40 : 64}
            />
            <Typography
              variant={isDesktop ? 'h4' : 'h5'}
              fontFamily="Sora"
              fontWeight={700}
              color="primary.main"
            >
              Gym Management
            </Typography>
          </Grid>
          <Stack
            spacing={3}
            minWidth={{ mobile: '100%', laptop: 400, desktop: 500 }}
            component="main"
          >
            <Typography variant={isDesktop ? 'h5' : 'h6'}>
              👋 Bem-vindo novamente!
            </Typography>

            <Stack spacing={2} component="form">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    autoFocus
                    variant="standard"
                    label="Email"
                    type="email"
                    fullWidth
                    autoComplete="email"
                    aria-invalid={!!fieldState.error}
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ''
                    }
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton disabled>
                              <Person />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                shouldUnregister={true}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    aria-invalid={!!fieldState.error}
                    variant="standard"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    autoComplete="current-password"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ''
                    }
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? 'Esconder senha'
                                  : 'Mostrar senha'
                              }
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />
              <Typography
                variant="caption"
                color="primary.main"
                sx={{ alignSelf: 'flex-end', textDecoration: 'underline' }}
              >
                <Link href="/">Esqueceu sua senha?</Link>
              </Typography>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitDisabled}
              endIcon={!isSubmitDisabled && <ArrowForward />}
            >
              {isSubmitDisabled ? 'Preencha os campos' : 'Entrar'}
            </Button>
          </Stack>
          <Stack
            spacing={4}
            component="footer"
            maxWidth={{
              mobile: '100%',
              tablet: 400,
              laptop: 500,
              desktop: 600,
            }}
            display="flex"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="overline" color="text.secondary">
                <Link href="/">Contato com o Suporte</Link>
              </Typography>
              <Box width="1px" height="50%" bgcolor="text.secondary" />
              <Typography variant="overline" color="text.secondary">
                <Link href="/">Termos de Uso</Link>
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Feito com 💜 por{' '}
              <a href="https://github.com/YuriLopesM">Yuri Lopes</a>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      {!isMobile && (
        <Grid size={{ mobile: 'grow' }} position="relative">
          <Box
            bgcolor="primary.main"
            sx={{
              mixBlendMode: 'overlay',
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              opacity: 0.9,
              pointerEvents: 'none',
            }}
          />
          <Image
            src="/hero.jpg"
            fill={true}
            alt="Imagem com halteres em uma academia"
            objectFit="cover"
            quality={90}
          />
        </Grid>
      )}
    </Grid>
  )
}
