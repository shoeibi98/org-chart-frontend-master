import { Typography } from '@mui/material'

const PageHeader = props => {
  // ** Props
  const { title, subtitle } = props

  return (
    <>
      <Typography
        variant='h5'
        fontWeight='bold'
        align='center'
        sx={theme => ({
          mb: 0,
          [theme.breakpoints.down('md')]: {
            mb: 4
          }
        })}
      >
        {title}
      </Typography>
      {Boolean(subtitle) && <Typography variant='subtitle2'>{subtitle}</Typography>}
    </>
  )
}

export default PageHeader
