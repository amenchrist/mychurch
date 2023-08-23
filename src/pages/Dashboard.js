import React from 'react'
import { useMyStore } from '../store'

function Dashboard() {

  const user = useMyStore((store) => store.user)

  const style = {
    width: '300px',
    height: '300px',
    border: '2px solid'
  }

  function AdminDashboard() {
    return(
      <div>
        Attendance, FirstTimers, Giving and Testimonies
        Average 
        Giving Trend Graph For the current time period (By Category)
        Weekly Attendance Trend Graph For the current time period (Sunday and Wednesday)
      </div>
    )
  }

  return (
    <div >
      <div style={{display: 'flex'}}>
        <div style={style}><p>Tithes</p></div>
        <div style={style}><p>Offerings</p></div>
        <div style={style}><p>Partnership</p></div>
      </div>
      <div style={{ ...style, width: '600px' }}>
        <p>Giving Trend Graph</p>
      </div>
      <div style={style}><p>Recent Transactions</p></div>
      <div style={style}><p>Notes</p></div>
    </div>
  )
}

export default Dashboard