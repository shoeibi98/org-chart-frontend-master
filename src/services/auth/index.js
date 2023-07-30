import axios from 'axios'

export const getCsrfCookie = async () => {
  return axios.get('/auth/prepare')
}

export const getCaptchaImage = async () => {
  const { data } = await axios.get('/captcha/api/default')

  return data
}

export const getUserInformation = async () => {
  const { data } = await axios.get('/auth/user')

  return data
}

export const loginUser = async credentials => {
  return axios.post('/auth/login', credentials)
}

export const changePassword = async credentials => {
  const { data } = await axios.post('/auth/change-password', credentials)

  return data
}

export const logoutUser = async () => {
  return axios.post('/auth/logout')
}

export const ping = async () => {
  const { data } = await axios.post('/auth/ping')

  return data
}

export const getSsoLogin = async endpointUrl => {
  const { data } = await axios.get(endpointUrl)

  return data
}

export const verifySsoLogin = async (endpointUrl, values) => {
  const { data } = await axios.post(endpointUrl, values)

  return data
}
