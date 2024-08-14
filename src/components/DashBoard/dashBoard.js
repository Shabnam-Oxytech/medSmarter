import React from 'react'
import './dashboard.css'
import LeftSidebar from './left-sidebar/left-sidebar'
import Navbar from './Navbar/navbar'
import RightSidebar from './Right-sidebar/right-Sidebar'


const DashBoard = () => {
  return (
    <div className='dashboard'>
        <Navbar />
        <LeftSidebar />
        <RightSidebar />
    </div>
  )
}

export default DashBoard
