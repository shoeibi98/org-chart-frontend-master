import Icon from 'src/@core/components/icon'
import { Grid } from '@mui/material'
import DashboardStatsCard from 'src/views/home/DashboardStatsCard'
import AnalyticsCongratulations from 'src/views/home/AnalyticsCongratulations'

const Home = () => {
  return (
    <>
      <Grid container spacing={6} className='match-height' justifyContent='center' sx={{ mb: 7 }}>
        <Grid item xl={6} lg={6}>
          <AnalyticsCongratulations />
        </Grid>
      </Grid>
      <Grid container spacing={6} className='match-height' justifyContent='center'>
        <Grid item xl={3} lg={3}>
          <DashboardStatsCard
            stats='1,359 نفر'
            color='primary'
            title='کارکنان'
            chipText='۷۸۰ نفر آقا / ۵۷۹ نفر خانم'
            icon={<Icon icon='mdi:account-group-outline' />}
          />
        </Grid>
        <Grid item xl={2} lg={3}>
          <DashboardStatsCard
            stats='73'
            color='primary'
            title='واحدهای سازمانی'
            chipText='در ۳۱ استان'
            icon={<Icon icon='mdi:file-tree-outline' />}
          />
        </Grid>
        <Grid item xl={3} lg={3}>
          <DashboardStatsCard
            stats='۲۰۴'
            color='primary'
            title='موقعیت شغلی آزاد'
            chipText='مجموعاً در تمام استان ها'
            icon={<Icon icon='mdi:crop-free' />}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
