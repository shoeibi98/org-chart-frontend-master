// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady || auth.loading) {
        return
      }
      if (!auth.loggedIn && auth.user === null) {
        console.log('login needed')
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, auth.loggedIn, auth.user, auth.loading]
  )
  if (auth.loading || auth.user === null || !auth.loggedIn) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
