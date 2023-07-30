import axios from 'axios'

export const departmentsTree = async () => {
  const { data } = await axios.post('/departments/index')

  return data
}

export const listDepartments = async () => {
  const { data } = await axios.get('/departments')

  return data
}

export const storeDepartment = data => {
  return axios.post('/departments', data)
}

export const updateDepartment = (id, data) => {
  return axios.put(`/departments/${id}`, data)
}

export const updateRootDepartment = (id, data) => {
  return axios.put(`/departments/${id}/update-root`, data)
}

export const moveUpDepartment = id => {
  return axios.patch(`/departments/${id}/move-up`)
}

export const moveDownDepartment = id => {
  return axios.patch(`/departments/${id}/move-down`)
}

export const deleteDepartment = id => {
  return axios.put(`/departments/${id}/expire`)
}
