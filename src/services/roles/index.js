import axios from 'axios'

export const getRoles = async () => {
  const { data } = await axios.post('/roles/index')

  return data
}
