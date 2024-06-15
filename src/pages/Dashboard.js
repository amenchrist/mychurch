import React, { useEffect, useState } from 'react';
import { useMyStore } from '../store';
import EventReport from '../components/Dashboard/EventReport';
import EventsList from '../components/Dashboard/EventsList';
import { useDashboardContext } from '../contexts/DashboardContextProvider';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';

function Dashboard() {

  const { showEventReport, setEvents, setShowEventReport, } = useDashboardContext();
  const { currentPage } = useMyStore();


  const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
  const [ eventsFound, setEventsFound ] = useState(false);

  const submitDate = (e) => {
    setDate(e.target.value);
    setShowEventReport(false)

  }

  console.log(dayjs(date).toDate().toString())
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
      {/* {adminMode? <AdminDashboard /> : <MemberDashboard />} */}
      <Container component="main" maxWidth="800px" sx={{maxWidth: '800px', width: '80vw',}}>
        <Box sx={{ marginTop: 8, height:'80%',  }} >
          <Typography component="h1" variant="h4">Analytics</Typography>
          <Box component="form" sx={{ mt: 2,  height:'100%', overflowY: 'auto', paddingTop:1}}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography component="p" sx={{ mb: 2,}} >Select an event date</Typography>
              <TextField required type="date" label="Date" value={date} onChange={submitDate} />
            </Grid>
          </Grid>
          {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Save</Button> */}
          {eventsFound? <></> : <Typography component="p" sx={{ mt: 2,}} >No events to report.</Typography>}
          </Box>
        </Box>

        
      { showEventReport ? <EventReport /> : eventsFound? <EventsList /> 
      : <div style={{width: '600px', height: '300px', border: '2px solid', marginTop: 15}}>
        <p>Graph of attendance figures for the year till date</p>
      </div> 
      }
      </Container>
    </>
  )
}

export default Dashboard