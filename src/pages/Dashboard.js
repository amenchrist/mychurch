import React from 'react';
import { useMyStore } from '../store';
import UserDashboard from '../components/Dashboard/UserDashboard';
import ChurchDashboard from '../components/Dashboard/ChurchDashboard';

function Dashboard() {

  const { currentPage } = useMyStore();
  
  return (
    <>
      {currentPage.type === "USER"? <UserDashboard /> : <ChurchDashboard />}
    </>
  )
}

export default Dashboard