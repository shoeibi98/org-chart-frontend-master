import IconButton from "@mui/material/IconButton"
import Icon from "@mui/material/Icon"
import Tooltip from "@mui/material/Tooltip"

const ActionButtons = ({ cell }) => {
  const { buttons } = cell.column
  return (
    <div className="flex items-center">
      {buttons.map((button) => (
        <Tooltip key={button.id} title={button.tooltip}>
          <IconButton
            key={button.id}
            onClick={() => {
              button.onClick(cell.row.original)
            }}
            size="medium"
          >
            <Icon>{button.icon}</Icon>
          </IconButton>
        </Tooltip>
      ))}
    </div>
  )
}
export default ActionButtons
