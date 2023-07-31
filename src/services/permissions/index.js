import axios from 'axios'

export const getPermissionsList = async () => {
  const { data } = await axios.get('/permissions')

  return data
}
