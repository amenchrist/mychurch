import React from 'react'
import { useMyStore } from '../store'

function Dashboard() {

  const { adminMode } = useMyStore();

  const style = {
    width: '300px',
    height: '300px',
    border: '2px solid'
  }

  function AdminDashboard() {
    return(
      <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap', width: 950, overflowY: 'auto' }}>
        <div style={style}>Membership Strength</div>
        <div style={style}>No of FirstTimers this month compared with last month</div>
        <div style={style}>Average Sunday Attendance In Past month</div>
        <div style={style}>Average Wednesday Attendance In Past month</div>
        <div style={{...style, width:600}}>Weekly Attendance Trend Graph For the current time period (Sunday and Wednesday)</div>
        <div style={style}>Average Monthly Giving</div>
        <div style={{...style, width:600}}>Giving Trend Graph For the current time period (By Category)</div>
      </div>
    )
  }

    function MemberDashboard() {
    return(
      <div >
        <div style={{width: 950, display: 'flex', flexWrap: 'wrap'}}>
          <div style={style}><p>Tithes</p></div>
          <div style={style}><p>Offerings</p></div>
          <div style={style}><p>Partnership</p></div>
          <div style={{ ...style, width: '600px' }}><p>Giving Trend Graph</p></div>
          <div style={style}><p>Announcements</p></div>
          <div style={style}><p>Next Event</p></div>
        </div>
      </div>
    )
  }
  return (
    <>
      {adminMode? <AdminDashboard /> : <MemberDashboard />}
    </>
  )
}

export default Dashboard