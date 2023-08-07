import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { useState } from "react"
import { useDispatch } from "react-redux"

function MultiSelectMenu(props) {
  const dispatch = useDispatch()
  const { selectedIds } = props

  const [anchorEl, setAnchorEl] = useState(null)

  function openSelectedMenu(event) {
    setAnchorEl(event.currentTarget)
  }

  function closeSelectedMenu() {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? "selectedSexesMenu" : null}
        aria-haspopup="true"
        onClick={openSelectedMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedSexesMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(removeRecords(selectedIds))
              closeSelectedMenu()
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default MultiSelectMenu
