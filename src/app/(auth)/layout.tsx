import { Header } from '@/components'
import { Grid } from '@mui/material'

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <Grid
        container
        maxWidth="100%"
        component="main"
        spacing={2}
        margin={{
          mobile: '24px auto',
          laptop: '32px auto',
        }}
        padding={{
          mobile: '0 32px',
          laptop: '0 64px',
          desktop: '0 128px',
        }}
      >
        {children}
      </Grid>
    </>
  )
}
