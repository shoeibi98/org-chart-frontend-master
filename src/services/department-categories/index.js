import axios from 'axios'

export const departmentCategoriesPaginated = async queryParams => {
  const { data } = await axios.post(`/department-categories/index`, queryParams)

  return data
}

export const departmentCategoriesList = async () => {
  const { data } = await axios.get(`/department-categories`)

  return data
}

export const storeDepartmentCategory = async values => {
  const { data } = await axios.post('/department-categories', values)

  return data
}

export const updateDepartmentCategory = async (id, values) => {
  const { data } = await axios.put(`/department-categories/${id}`, values)

  return data
}

export const deleteDepartmentCategory = async id => {
  const { data } = await axios.put(`/department-categories/${id}/expire`)

  return data
}
