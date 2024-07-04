import React from 'react'
import { useMyStore } from '../../store';

export default function UserDashboard() {

  const { currentPage } = useMyStore();

  return (
    <div>
        <h2>Welcome to {currentPage?.name}</h2>
    </div>
  )
}
