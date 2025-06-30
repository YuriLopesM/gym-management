import '@mui/system'

declare module '@mui/system' {
  interface BreakpointOverrides {
    mobile: true
    tablet: true
    laptop: true
    desktop: true

    // Remove original breakpoints
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
  }
}
