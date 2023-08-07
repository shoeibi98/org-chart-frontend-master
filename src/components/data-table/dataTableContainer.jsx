import React, { forwardRef, useEffect, useRef } from "react"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"
import TableBody from "@mui/material/TableBody"
import clsx from "clsx"
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table"
import Checkbox from "@mui/material/Checkbox"
import { styled } from "@mui/material/styles"
import PropTypes from "prop-types"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import DataTablePaginationActions from "./dataTablePaginationActions"

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef
  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  )
})

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}))

const DataTableContainer = ({ columns, data, onRowClick }) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      pageSize: 2,
      autoResetPage: true,
      manualSortBy: true,
      manualPagination: true
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((_columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          sortable: false,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                {...row.getToggleRowSelectedProps()}
                onClick={(ev) => ev.stopPropagation()}
              />
            </div>
          )
        },
        ..._columns
      ])
    }
  )
  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value))
  }

  /*
  useEffect(() => {
    console.log("query params changed")
    console.log(pageIndex, pageSize, selectedRowIds, sortBy)
  }, [pageIndex, pageSize, selectedRowIds, sortBy])
*/

  return (
    <div className="flex flex-col w-full min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
      <TableContainer className="flex flex-12222">
        <Table {...getTableProps()} stickyHeader size="small">
          <TableHead>
            {headerGroups?.map((headerGroup) => (
              <TableRow {...headerGroup?.getHeaderGroupProps()}>
                {headerGroup.headers?.map((column) => (
                  <TableCell
                    className="whitespace-nowrap"
                    {...(!column?.sortable
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column?.getSortByToggleProps()))}
                  >
                    {column.render("Header")}
                    {column.sortable ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has an unsorted state which is not treated here
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page?.map((row, i) => {
              prepareRow(row)
              return (
                <StyledTableRow
                  {...row.getRowProps()}
                  onClick={(ev) => onRowClick && onRowClick(ev, row)}
                  className="truncate cursor-pointer"
                >
                  {row.cells?.map((cell) => {
                    return (
                      <TableCell
                        {...cell?.getCellProps()}
                        className={clsx("", cell.column.className)}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    )
                  })}
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        classes={{
          root: "shrink-0 border-t-1"
        }}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: data.length + 1 }]}
        colSpan={5}
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { "aria-label": "ردیف در هرصفحه" },
          native: false
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={DataTablePaginationActions}
      />
    </div>
  )
}

DataTableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func
}
export default React.memo(DataTableContainer)
