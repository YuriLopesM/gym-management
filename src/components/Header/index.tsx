'use client'

import { useBreakpoint } from '@/hooks'

import { Menu } from '@/components'

import Logo from '@/assets/svg/logo.svg'
import { Grid, useTheme } from '@mui/material'

export function Header() {
  const theme = useTheme()
  const { isBiggerThanTablet } = useBreakpoint()

  return (
    <Grid
      container
      width="100%"
      height="72px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      component="header"
      borderBottom={
        isBiggerThanTablet ? `1px solid ${theme.palette.divider}` : 'none'
      }
      padding={{
        mobile: '0 32px',
        laptop: '0 64px',
        desktop: '0 128px',
      }}
    >
      <Grid>
        <Menu />
      </Grid>
      <Grid>
        <Logo width="40px" />
      </Grid>
    </Grid>
  )
}
