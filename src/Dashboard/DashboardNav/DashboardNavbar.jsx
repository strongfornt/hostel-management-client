// import component 👇
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import { HiMenuAlt3 } from "react-icons/hi";
//import styles 👇
import 'react-modern-drawer/dist/index.css'
import './drawer.css'

import ResponsiveDashboard from '../DasboardBar/ResponsiveDashboard';

export default function DashboardNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
  return (
    <>
          <button onClick={toggleDrawer}><HiMenuAlt3 /></button>
    <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        lockBackgroundScroll={true}
        className=''
    >
        
        <ResponsiveDashboard setIsOpen={setIsOpen} />
    </Drawer>
    </>
  )
}
