import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useMyStore } from '../../store';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import EventReport from './EventReport';
import EventsList from './EventsList';


export default function ChurchDashboard() {

  const { currentPage } = useMyStore();
  const { showEventReport, setEvents, setShowEventReport, } = useDashboardContext();


  const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
  const [ eventsFound, setEventsFound ] = useState(false);

  const [ dateRequested, setDateRequested ] = useState(false)

  const submitDate = (e) => {
    setDate(e.target.value);
    setShowEventReport(false);
    setDateRequested(true);
  }
  

  useEffect(() => {
    const getEvents = async () => {
      console.log('searching for all events')
      try {
        const events = await currentPage.getEvents()
        if(events){
          const relevantEvents = events.filter((e)=> e.hasStarted).sort((e1,e2) => dayjs(e2.date) - dayjs(e1.date));
          setEventsFound(relevantEvents.length > 0)
          setEvents(relevantEvents)
          console.log(relevantEvents)
        }
      }catch (err) {
        console.log("Error getting Events in Dashboard")
        console.log(err)
      } 
    }
    getEvents()
  }, [currentPage, setEvents,])

  useEffect(() => {
    const getEventsByDate = async () => {
      console.log('searching for new date')
      try {
        const events = await currentPage.getEventsByDate(date)
        if(events){
          // const relevantEvents = events.filter((e)=> e.hasStarted)
          setEventsFound(events.length > 0)
          setEvents(events)
        }
      }catch (err) {
        console.log("Error getting Events by date")
        console.log(err)
      } 

    }

    if(dateRequested){
      getEventsByDate();
      setDateRequested(false)
    } 
  }, [date, currentPage, setEvents, dateRequested])

  function previousReturn() {
    const style = {
      width: '300px',
      height: '30vh',
      border: '2px solid'
    }
    return(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap', width: 950, overflowY: 'auto'}}>
          <div style={style}>Average Sunday Attendance In Past month</div>
          <div style={style}>Average Wednesday Attendance In Past month</div>
          <div style={{...style, width:600}}>Weekly Attendance Trend Graph For the current time period (Sunday and Wednesday)</div>
          <div style={style}>Average Monthly Giving</div>
          <div style={{...style, width:600}}>Giving Trend Graph For the current time period (By Category)</div> 
        </div> 
        <div style={style}>Membership Strength</div>
        <div style={style}>No of FirstTimers this month compared with last month</div>
      </div>
    )
  }

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

        <Box sx={{ height:'80%',  }} >
          { showEventReport ? <EventReport /> : eventsFound? <EventsList /> 
          : <div style={{width: '600px', height: '300px', border: '2px solid', marginTop: 15}}>
            <p>Graph of attendance figures for the year till date</p>
          </div> 
          }
        </Box>
      </Container>
    </>
  )

}