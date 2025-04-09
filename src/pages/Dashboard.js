import React from 'react';
import { useMyStore } from '../store';
import UserDashboard from '../components/Dashboard/UserDashboard';
import ChurchDashboard from '../components/Dashboard/ChurchDashboard';
import { Outlet } from 'react-router-dom';
import PostCollection from '../components/PostCollection';
import { Card } from '@mui/material';
import PageHeader from '../components/Dashboard/PageHeader';
import { DashboardContextProvider } from '../contexts/DashboardContextProvider';

function Dashboard() {

  const { currentPage } = useMyStore();
  
  return (
    <div style={{height: '100%', overflowY: 'auto', border: '2px solid',}}>
      <DashboardContextProvider >
        <PageHeader />
        <Outlet />
      {/* <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0' }}>
        
      </Card> */}
      </DashboardContextProvider>
      {/* {currentPage.type === "USER"? <UserDashboard /> : <ChurchDashboard />} */}
      </div>

  )
}

export default Dashboard