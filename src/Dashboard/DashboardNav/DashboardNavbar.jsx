// import component 👇
import { useEffect, useState } from 'react'
import Drawer from 'react-modern-drawer'
import { HiMenuAlt3 } from "react-icons/hi";
//import styles 👇
import 'react-modern-drawer/dist/index.css'
import './drawer.css'
import './headroom.css'

import ResponsiveDashboard from '../DasboardBar/ResponsiveDashboard';
import Headroom from 'react-headroom';
import { calculateScrollbarWidth } from '../../shared/Navbar/ScrollBar';

export default function DashboardNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    useEffect(() => {
        if (isOpen) {
          const scrollbarWidth = calculateScrollbarWidth();
    
          document.body.style.paddingRight = `${scrollbarWidth}px`;
    
          document.body.style.overflow = "hidden"; 
        } else {
          document.body.style.paddingRight = "0";
    
          document.body.style.overflow = "auto";
        }
      }, [isOpen]);
    
  return (
    <>
    <Headroom 
       className='headroom'
    >
    <div className='flex bg-white justify-between px-2 w-full py-4 '>
            <h1 className='text-2xl font-bold  text-[#3F72AF] '>Dine<span className='text-[#4b5664]'>Ease</span></h1>
    <button  className='text-2xl shadow-lg p-2 rounded-full'  onClick={toggleDrawer}><HiMenuAlt3 /></button>
    </div>
</Headroom>
          
    <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        lockBackgroundScroll={true}
        className='EZDrawer__container'
    >
        
        <ResponsiveDashboard setIsOpen={setIsOpen} />
    </Drawer>
    </>
  )
}
