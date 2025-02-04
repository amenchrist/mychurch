import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function PageContainer() {
  return(
    <div style={{ display: 'flex', flexDirection:'column', height: '100vh' }}>
      <Sidebar />
      <Outlet />
      <BottomNav />
    </div>
  )
}

 