import {createContext, useContext, useState} from "react";


const RoleContext = createContext({})
export const useRoleContext = () => useContext(RoleContext)

const RoleWrapper = ({children}) => {
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    /*setSelectedCheckbox([])
       setIsIndeterminateCheckbox(false)*/
  }
  const value = {
    open, setOpen,
    dialogTitle, setDialogTitle,
    handleClickOpen,
    handleClose
  }
  return <RoleContext.Provider value={value}>
    {children}
  </RoleContext.Provider>
}
export default RoleWrapper
