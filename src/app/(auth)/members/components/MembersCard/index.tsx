import { Member } from '@/types'
import { Grid, Stack, Typography, useTheme } from '@mui/material'

type MembersCardProps = Pick<
  Member,
  'id' | 'name' | 'paymentPlan' | 'email'
> & {
  handleOpenEdit: (id: number) => void
}

export function MembersCard({
  id,
  name,
  paymentPlan,
  email,
  handleOpenEdit,
}: MembersCardProps) {
  const theme = useTheme()

  return (
    <Grid
      size={{
        mobile: 12,
        tablet: 6,
        laptop: 6,
        desktop: 3,
      }}
      py={2}
      px={2}
      minHeight="76px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={2}
      onClick={() => handleOpenEdit(id)}
    >
      <Stack spacing={0}>
        <Typography variant="body1" color="text.primary">
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {email}
        </Typography>
      </Stack>
      <Typography variant="overline" color="primary.main">
        {paymentPlan}
      </Typography>
    </Grid>
  )
}
