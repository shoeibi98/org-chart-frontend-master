import axios from 'axios'
import { toast } from 'react-hot-toast'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'XMLHttpRequest'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.withCredentials = true

const host = 'http://127.0.0.1:8000'
const nonePrefixedUrls = ['/captcha', '/sanctum', '/sso']
const reLoginMessage = 'لطفاً مجدداً وارد سامانه شوید.'

/* Configure axios response handler */
axios.interceptors.response.use(
  response => {
    if (response?.data?.message) {
      toast.success(response.data.message, {
        //
      })
    }

    return Promise.resolve(response)
  },
  async exception => {
    const needsLogin = exception?.response?.status === 419 || exception?.response?.status === 401
    const message = exception.response?.data?.message

    if (needsLogin) {
      const { pathname } = window.location
      if (pathname !== '/main/auth/login') {
        toast.error(reLoginMessage, {
          //
        })
        localStorage.clear()
        window.location = '/'
      }
    }

    if (!needsLogin && message) {
      toast.error(message, {
        //
      })
    }

    return Promise.reject(exception)
  }
)

/* Configure axios person-edit-page handler */
axios.interceptors.request.use(
  config => {
    config.baseURL = host + '/api'

    for (let i = 0; i < nonePrefixedUrls.length; i++) {
      const pattern = nonePrefixedUrls[i]
      if (config.url.match(pattern)) {
        config.baseURL = host
        break
      }
    }

    // config.headers['User-Id'] = currentUser?.username || 'guest'

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const AxiosConfigurator = ({ children }) => {
  return <>{children}</>
}

export default AxiosConfigurator
