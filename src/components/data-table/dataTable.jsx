import React from "react"
import DataTableContainer from "./dataTableContainer"

const DataTable = ({ data, columns, onRowClick}) => {
  return (
    <>
      <DataTableContainer data={data} columns={columns} onRowClick={onRowClick} />
    </>
  )
}
export default React.memo(DataTable)
