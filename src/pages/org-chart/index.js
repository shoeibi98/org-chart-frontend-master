import PageHeader from 'src/@core/components/page-header'
import OrgChartWrapper from 'src/views/org-chart/OrgChartWrapper'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useEffect, useState } from 'react'
import { departmentTypesList } from 'src/services/department-types'
import { useQuery } from '@tanstack/react-query'
import { departmentCategoriesList } from 'src/services/department-categories'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'

export default () => {
  const { settings, saveSettings } = useSettings()
  const [saveAsModal, setSaveAsModal] = useState(false)
  const [entryModal, setEntryModal] = useState(false)
  const [record, setRecord] = useState()

  const { data: departmentTypes } = useQuery({
    queryKey: ['departmentTypesList'],
    queryFn: departmentTypesList,
    initialData: []
  })

  const { data: departmentCategories } = useQuery({
    queryKey: ['departmentCategoriesList'],
    queryFn: departmentCategoriesList,
    initialData: []
  })

  useEffect(() => {
    saveSettings({
      ...settings,
      navCollapsed: true
    })

    return () => {
      saveSettings({
        ...settings,
        navCollapsed: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageHeader title='مدیریت چارت سازمانی' />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant='contained' startIcon={<Icon icon='mdi:plus' />}>
          ثبت محل خدمت جدید
        </Button>
      </Box>
      <OrgChartWrapper />
    </>
  )
}
