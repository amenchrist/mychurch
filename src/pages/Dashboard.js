import React, { useEffect, useState } from 'react';
import { useMyStore } from '../store';
import EventReport from '../components/Dashboard/EventReport';
import EventsList from '../components/Dashboard/EventsList';
import { useDashboardContext } from '../contexts/DashboardContextProvider';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import UserDashboard from '../components/Dashboard/UserDashboard';
import ChurchDashboard from '../components/Dashboard/ChurchDashboard';

function Dashboard() {

  const { showEventReport, setEvents, setShowEventReport, } = useDashboardContext();
  const { currentPage } = useMyStore();


  const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
  const [ eventsFound, setEventsFound ] = useState(false);

  const submitDate = (e) => {
    setDate(e.target.value);
    setShowEventReport(false)

  }

  useEffect(() => {


    const getEventsByDate = async () => {

      try {
        const q = query(collection(db, `pages/${currentPage.handle}/events`), where("date", "==", date));
        const querySnapshot = await getDocs(q); 
        const newEvents = []
        
        querySnapshot.forEach((doc) => {
          newEvents.push(doc.data())
        });
        newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
        setEventsFound(newEvents.length > 0)
        setEvents([...newEvents])
      }catch (err) {
        console.log("Error getting Events by date")
        console.log(err)
      } 

    }

      getEventsByDate();


  }, [date, currentPage.handle, setEvents])

  
  return (
    <>
      {currentPage.type === "USER"? <UserDashboard /> : <ChurchDashboard />}
    </>
  )
}

export default Dashboard