// import { useTranslation } from "react-i18next"
import Typography from "@mui/material/Typography"
import { toJalaliDateTime } from "../../../helpers/Utils"

const JalaliDateTimeColumnFormatter = ({ cell }) => {
  const { id } = cell.column
  let dateTime = ""

  switch (id) {
    case "created_at":
      dateTime = cell.row.original.created_at
      break
    case "updated_at":
      dateTime = cell.row.original.updated_at
      break
    case "deleted_at":
      dateTime = cell.row.original.deleted_at
      break
    default:
      dateTime = undefined
  }

  return <Typography> {dateTime ? toJalaliDateTime(dateTime) : "---"}</Typography>
}

export default JalaliDateTimeColumnFormatter
