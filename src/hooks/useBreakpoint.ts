import { useMediaQuery, useTheme } from '@mui/material'

export function useBreakpoint() {
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const isTablet = useMediaQuery(theme.breakpoints.between('tablet', 'desktop'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'))

  const isBiggerThanMobile = useMediaQuery(theme.breakpoints.up('tablet'))
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up('laptop'))

  const isSmallerThanLaptop = useMediaQuery(theme.breakpoints.down('laptop'))
  const isSmallerThanDesktop = useMediaQuery(theme.breakpoints.down('desktop'))

  return {
    isMobile,
    isTablet,
    isDesktop,
    isBiggerThanMobile,
    isBiggerThanTablet,
    isSmallerThanLaptop,
    isSmallerThanDesktop,
  }
}
