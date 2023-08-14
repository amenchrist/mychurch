import React from 'react'
import { useMyStore } from '../store'

function Dashboard() {

  const user = useMyStore((store) => store.user)

  return (
    <div>Dashboard of {user?.email}</div>
  )
}

export default Dashboard