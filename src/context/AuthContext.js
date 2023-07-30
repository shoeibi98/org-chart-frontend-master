// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { useQuery } from '@tanstack/react-query'
import { getUserInformation } from '../services/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [loggedIn, setLoggedIn] = useState(false)
  const [ssoEnabled, setSsoEnabled] = useState(false)
  const [ssoEndpoints, setSsoEndpoints] = useState()
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInformation,
    onSuccess: data => {
      setLoggedIn(data.logged_in)
      setSsoEnabled(data.sso_enabled)
      setSsoEndpoints(data.sso_endpoints)
      setUser(data.user)
      setLoading(false)
    }
  })

  // ** Hooks
  const router = useRouter()

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        setUser({ ...response.data.user })
        setLoggedIn(true)

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    loggedIn,
    ssoEnabled,
    ssoEndpoints,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
