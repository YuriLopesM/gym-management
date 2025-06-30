'use client'
import { deepPurple, purple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

import { ptBR as core } from '@mui/material/locale'
import { ptBR } from '@mui/x-date-pickers/locales'

const theme = createTheme(
  {
    typography: {
      fontFamily: 'var(--font-roboto)',
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
      },
    },
    palette: {
      primary: purple,
      secondary: deepPurple,
    },
  },
  ptBR,
  {},
  core
)

export default theme
