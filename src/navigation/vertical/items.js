import { useTranslation } from 'react-i18next'

const NavigationItems = () => {
  const { t } = useTranslation('navigation')

  return [
    {
      title: t('home'),
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: t('orgChart'),
      path: '/org-chart',
      icon: 'mdi:email-outline'
    }
  ]
}

export default NavigationItems
