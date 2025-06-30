'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useBreakpoint } from '@/hooks'

import {
  Face,
  FitnessCenter,
  Logout,
  Menu as MenuIcon,
  People,
  Settings,
} from '@mui/icons-material'
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { Fragment, useState } from 'react'

const pages = {
  modules: [
    { name: 'Aulas', href: '/classes', icon: FitnessCenter },
    { name: 'Alunos', href: '/members', icon: People },
  ],
  personal: [
    { name: 'Perfil', href: '/profile', icon: Face },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ],
}

const keyTitles: Record<string, string> = {
  modules: 'Módulos',
  personal: 'Você',
}

export function Menu() {
  const theme = useTheme()
  const pathname = usePathname()

  const { isSmallerThanLaptop, isBiggerThanTablet } = useBreakpoint()

  const [open, setOpen] = useState(false)

  const menuItemStyles = {
    ':hover': {
      cursor: 'pointer',
      color: 'primary.dark',
      textShadow: `0 0 1px ${theme.palette.primary.main}`,
    },
  }

  const handleOpenMenu = () => {
    if (!isSmallerThanLaptop)
      throw new Error('Drawer toggle is only for smaller screens')

    setOpen(true)
  }

  return (
    <nav>
      {isSmallerThanLaptop && (
        <>
          <IconButton onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>

          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <Stack
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={2}
              py={6}
              height="100%"
            >
              <Stack spacing={1} width={200} component={List}>
                {Object.entries(pages).map(([section, items]) => (
                  <Fragment key={section}>
                    {/* Cabeçalho */}
                    <ListItem disablePadding>
                      <Typography
                        variant="overline"
                        sx={{ pl: 2 }}
                        color="text.primary"
                      >
                        {keyTitles[section]}
                      </Typography>
                    </ListItem>

                    {/* Links */}
                    {items.map(({ name, href, icon: Icon }) => (
                      <ListItem
                        key={href}
                        disablePadding
                        sx={{
                          borderRadius: 1,
                          bgcolor:
                            pathname === href ? 'primary.main' : 'transparent',
                          color:
                            pathname === href
                              ? 'primary.contrastText'
                              : 'text.secondary',
                          px: 2,
                          py: 1,
                          gap: 2,
                        }}
                      >
                        <Icon />
                        <Link href={href} style={{ width: '100%' }}>
                          <Typography variant="subtitle1" letterSpacing={1}>
                            {name}
                          </Typography>
                        </Link>
                      </ListItem>
                    ))}
                  </Fragment>
                ))}
              </Stack>
              <Button
                type="button"
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<Logout />}
              >
                Desconectar
              </Button>
            </Stack>
          </Drawer>
        </>
      )}

      {isBiggerThanTablet && (
        <List
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {Object.entries(pages).map(([section, items]) => (
            <Fragment key={section}>
              {items.map((page) => (
                <ListItem
                  key={page.name}
                  sx={{
                    ...menuItemStyles,
                    color:
                      pathname === page.href ? 'primary.main' : 'text.primary',
                  }}
                >
                  <Link
                    href={page.href}
                    style={{ textDecoration: 'none', width: '100%' }}
                  >
                    <Typography
                      variant="subtitle1"
                      letterSpacing={1}
                      sx={{ width: '100%' }}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </Fragment>
          ))}
        </List>
      )}
    </nav>
  )
}
