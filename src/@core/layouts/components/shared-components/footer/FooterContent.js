import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const FooterContent = () => {
  const { t } = useTranslation('footer')

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='body2'>{t('footerText')}</Typography>
    </Box>
  )
}

export default FooterContent
