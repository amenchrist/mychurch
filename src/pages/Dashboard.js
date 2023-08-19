import React from 'react'
import { useMyStore } from '../store'

function Dashboard() {

  const user = useMyStore((store) => store.user)

  const style = {
    width: '300px',
    height: '300px',
    border: '2px solid'
  }

  return (
    <div >Dashboard of {user?.email}
      <div style={{display: 'flex'}}>
        <div style={style}><p>Tithes</p></div>
        <div style={style}><p>Offerings</p></div>
        <div style={style}><p>Partnership</p></div>
      </div>
      <div style={{width: '600px', height: '300px', border: '2px solid'}}>
        <p>Giving Trend Graph</p>
      </div>
      <div style={style}><p>Recent Transactions</p></div>
      <div style={style}><p>Notes</p></div>
    </div>
  )
}

export default Dashboard