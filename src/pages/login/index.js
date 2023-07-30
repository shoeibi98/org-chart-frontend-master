import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import yup from 'src/helpers/form/yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import i18next from 'i18next'
import fa from 'src/i18n/login/fa'
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useQuery } from '@tanstack/react-query'
import { getCaptchaImage } from 'src/services/auth'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

i18next.addResourceBundle('fa', 'auth', fa)

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '28rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  captcha: yup.string().required()
})

const defaultValues = {
  username: '',
  password: '',
  captcha: '',
  captcha_key: ''
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { t } = useTranslation('auth')
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const captchaAction = useQuery({
    queryKey: ['captcha'],
    queryFn: getCaptchaImage,
    refetchInterval: 50000,
    onSuccess: data => {
      setValue('captcha_key', data.key)
    }
  })

  const onSubmit = data => {
    auth.login(data, () => {
      resetField('password')
      resetField('captcha')
    })
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fillOpacity='0.4'
                  fill='url(#paint0_linear_7821_79167)'
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fillOpacity='0.4'
                  fill='url(#paint1_linear_7821_79167)'
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                />
                <defs>
                  <linearGradient
                    y1='0'
                    x1='25.1443'
                    x2='25.1443'
                    y2='143.953'
                    id='paint0_linear_7821_79167'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop />
                    <stop offset='1' stopOpacity='0' />
                  </linearGradient>
                  <linearGradient
                    y1='0'
                    x1='25.1443'
                    x2='25.1443'
                    y2='143.953'
                    id='paint1_linear_7821_79167'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop />
                    <stop offset='1' stopOpacity='0' />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                variant='h6'
                sx={{
                  ml: 2,
                  lineHeight: 1,
                  fontWeight: 700,
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>{t('pageTitle')}</TypographyStyled>
              <Typography variant='body2'>{t('pageDescription')}</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='username'
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label={t('username')}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.username)}
                      required
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  {t('password')}
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      required
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-login-v2-captcha' error={Boolean(errors.captcha)}>
                  {t('captcha')}
                </InputLabel>
                <Controller
                  name='captcha'
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Captcha'
                      onChange={onChange}
                      id='auth-login-v2-captcha'
                      error={Boolean(errors.password)}
                      required
                      type='text'
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={captchaAction.refetch}
                            tabIndex={-1}
                          >
                            <Icon icon='mdi:reload' fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
              </FormControl>
              <Box sx={{ textAlign: 'center', mb: 7 }}>
                <img
                  alt='captcha'
                  src={captchaAction.data?.img}
                  style={{
                    borderRadius: 5
                  }}
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button size='large' type='submit' variant='contained' startIcon={<Icon icon='mdi:account-check' />}>
                  {t('loginButton')}
                </Button>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
