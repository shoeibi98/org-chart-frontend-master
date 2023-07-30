import OrgChart from 'src/libs/balkan-app/orgchart'
import { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

OrgChart.MIXED_LAYOUT_ALL_NODES = true
OrgChart.MIXED_LAYOUT_FOR_NODES_WITH_COLLAPSED_CHILDREN = false
OrgChart.SEARCH_PLACEHOLDER = 'جستجوی نام یا کد محل خدمت'

OrgChart.templates.isla.node = `<rect filter="url(#isla-shadow)" x="0" y="20" rx="7" ry="7" height="100" width="180" fill="#efefef" stroke-width="2" stroke="#787EFF" ></rect>
<rect x="25" y="50" rx="10" ry="10" height="20" width="130" fill="#787EFF" stroke-width="3" stroke="#787EFF"></rect>
<rect x="70" y="88" rx="10" ry="10" height="20" width="40" fill="#787EFF" stroke-width="1" stroke="#787EFF"></rect>
<rect fill="#fff" stroke="#787EFF" stroke-width="2" x="40" y="0" rx="13" ry="13" width="100" height="40"></rect>`

OrgChart.templates.isla.field_0 =
  '<text data-width="120" style="font-size: 12px;" fill="#fff" x="90" y="62" text-anchor="middle">{val}</text>'

OrgChart.templates.isla.field_1 =
  '<text data-width="160" style="font-size: 14px; font-weight: bold" fill="#000" x="90" y="25" text-anchor="middle">{val}</text>'

OrgChart.templates.isla.field_2 =
  '<text data-width="160" style="font-size: 12px;" fill="#fff" x="90" y="100" text-anchor="middle">{val}</text>'

// OrgChart.templates.isla.field_3 = '<text class="field_3" style="font-size: 14px;" fill="#000" x="90" y="30" text-anchor="middle">{val}</text>'

OrgChart.enableDragDrop = true

const OrgChartWrapper = () => {
  const [chart, setChart] = useState({})
  const chartRef = useRef()

  useEffect(() => {
    const chartObject = new OrgChart(document.getElementById('tree'), {
      showXScroll: OrgChart.scroll.visible,
      showYScroll: OrgChart.scroll.visible,
      mouseScrool: OrgChart.action.ctrlZoom,
      orderBy: 'id',
      enableSearch: true,
      enableDragDrop: true,
      nodeMouseClick: OrgChart.action.none,
      template: 'isla',
      layout: OrgChart.mixed,
      toolbar: {
        layout: true,
        zoom: true,
        fit: true,
        expandAll: true
      },
      nodeBinding: {
        field_0: 'name',
        field_1: 'department_number',
        field_2: 'department_category_name'
      }
    })

    chartObject.load([
      {
        id: 1,
        name: 'وزارت جهاد و کشاورزی',
        department_number: '10400',
        department_category_name: 'ستاد',
        is_headquarter: true
      }
    ])
  }, [])

  return (
    <>
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <div id='tree' dir='ltr' ref={chartRef}></div>
        </CardContent>
      </Card>
    </>
  )
}

export default OrgChartWrapper
