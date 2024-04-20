import React from 'react';

export default function AdminDashboard() {

  const style = {
    width: '300px',
    height: '30vh',
    border: '2px solid'
  }

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