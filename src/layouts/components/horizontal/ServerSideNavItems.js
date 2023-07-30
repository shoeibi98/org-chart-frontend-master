// ** React Imports
import { useEffect, useState } from 'react'

// ** Axios Import
import axios from 'axios'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    axios.get('/navigation').then(response => {
      const menuArray = response.data
      setMenuItems(menuArray)
    })
  }, [])

  return { menuItems }
}

export default ServerSideNavItems