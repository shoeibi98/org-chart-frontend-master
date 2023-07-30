// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const DashboardStatsCard = props => {
  // ** Props
  const { title, color, icon, stats, chipText, trendNumber, trend = 'positive' } = props

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 6, width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <CustomAvatar skin='light' variant='rounded' color={color}>
            {icon}
          </CustomAvatar>
        </Box>
        <Typography variant='h6' sx={{ mb: 1 }} align='center' fontWeight='bold'>
          {stats}
        </Typography>
        <Typography variant='body2' sx={theme => ({ mb: 5, color: theme.palette[color].main })} align='center'>
          {title}
        </Typography>
        {chipText && (
          <CustomChip
            skin='light'
            size='small'
            label={chipText}
            color='secondary'
            sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', alignSelf: 'center', color: 'text.secondary' }}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default DashboardStatsCard
