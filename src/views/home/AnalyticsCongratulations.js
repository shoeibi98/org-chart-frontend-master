import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import { Link } from '@mui/material'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

const AnalyticsCongratulations = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' align='justify'>
              <Box component='span' sx={{ fontWeight: 600 }}>
                68%
              </Box>{' '}
              جایگاه های شغلی تعریف شده در سیستم خالی هستند.
            </Typography>
            <Typography sx={{ mb: 4.5 }} variant='body2' align='justify'>
              به منظور مدیریت جایگاه های آزاد به صفحه مدیریت چارت سازمانی مراجعه نمایید.
            </Typography>
            <Button variant='contained' component={Link} to='/org-chart'>
              مدیریت چارت سازمانی
            </Button>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img alt='Congratulations John' src={`/images/cards/illustration-john-${theme.palette.mode}.png`} />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCongratulations
