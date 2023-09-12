import React from 'react'
import { useMyStore } from '../store'

function Dashboard() {

  const { adminMode } = useMyStore();

  const style = {
    width: '300px',
    height: '30vh',
    border: '2px solid'
  }

  function AdminDashboard() {
    return(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap', width: 950, overflowY: 'auto'}}>
          <div style={style}>Membership Strength</div>
          <div style={style}>No of FirstTimers this month compared with last month</div>
          <div style={style}>Average Sunday Attendance In Past month</div>
          <div style={style}>Average Wednesday Attendance In Past month</div>
          <div style={{...style, width:600}}>Weekly Attendance Trend Graph For the current time period (Sunday and Wednesday)</div>
          <div style={style}>Average Monthly Giving</div>
          <div style={{...style, width:600}}>Giving Trend Graph For the current time period (By Category)</div>
        </div>
      </div>
    )
  }

  function MemberDashboard() {
    return(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <div style={{width: 650, display: 'flex', flexWrap: 'wrap', overflowY: 'auto', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{ ...style, width: '600px' }}><p>Total Giving Trend Graph</p></div>
          <div style={style}><p>Announcements</p></div>
          <div style={style}><p>Upcoming Events</p></div> 
          <div style={style}><p>Notes</p></div>
          <div style={style}><p>My Profile</p></div>
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