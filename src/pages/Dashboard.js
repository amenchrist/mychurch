import React from 'react';
import { useMyStore } from '../store';
import EventReport from '../components/Dashboard/EventReport';
import EventsList from '../components/Dashboard/EventsList';
import { useDashboardContext } from '../contexts/DashboardContextProvider';

function Dashboard() {

  const { showEventReport } = useDashboardContext();
  
  return (
    <>
      {/* {adminMode? <AdminDashboard /> : <MemberDashboard />} */}
      { showEventReport ? <EventReport /> : <EventsList />}
    </>
  )
}

export default Dashboard