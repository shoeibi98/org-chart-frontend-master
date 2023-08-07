import Typography from "@mui/material/Typography"
import MultiSelectMenu from "../multiSelectMenu"

const IndexColumnFormatter = () => {

  return {
    Header: ({ selectedFlatRows }) => {
      const selectedRowIds = selectedFlatRows.map((row) => row.original.id)

      return selectedFlatRows.length > 0 ? (
        <MultiSelectMenu selectedIds={selectedRowIds} />
      ) : (
        "#"
      )
    },
    accessor: "id",
    Cell: ({ row }) => <Typography>{row.index + 1}</Typography>,
    className: "justify-center",
    width: 30,
    sortable: false
  }
}
export default IndexColumnFormatter
