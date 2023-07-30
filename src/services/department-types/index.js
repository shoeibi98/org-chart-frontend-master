import axios from 'axios'

export const departmentTypesPaginated = async queryParams => {
  const { data } = await axios.post(`/department-types/index`, queryParams)

  return data
}

export const departmentTypesList = async () => {
  const { data } = await axios.get(`/department-types`)

  return data
}

export const storeDepartmentType = async values => {
  const { data } = await axios.post('/department-types', values)

  return data
}

export const updateDepartmentType = async (id, values) => {
  const { data } = await axios.put(`/department-types/${id}`, values)

  return data
}

export const deleteDepartmentType = async id => {
  const { data } = await axios.put(`/department-types/${id}/expire`)

  return data
}
