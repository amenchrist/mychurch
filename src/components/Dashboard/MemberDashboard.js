import React from 'react';

export default function MemberDashboard() {

  const style = {
    width: '300px',
    height: '30vh',
    border: '2px solid'
  }

    
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