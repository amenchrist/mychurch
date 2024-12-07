import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useMyStore } from '../store';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import dayjs from 'dayjs';

export default function EventPage({setNewEvent}) {  

  const { setEvent, currentPage, event } = useMyStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ error, setError ] = useState(false);
  const [ updated, setUpdated ] = useState(false);  
  const [ isToday, setIsToday ] = useState(false);  

  useEffect(() => {
    if(id !== event?.id){
        setError(true)
    }
  }, [id, event, setEvent])

  useEffect(() => {
    if(dayjs(event?.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && !isToday){
      setIsToday(true)
    }
  }, [event, setEvent, isToday])
  
  const [ date, setDate ] = useState(dayjs(event?.date).format('YYYY-MM-DD'));
  const [ time, setTime ] = useState(event?.time);
  const [ name, setName ] = useState(event?.name);
  const [ description, setDescription ] = useState(event?.bio || '');
  const [ watchLink, setWatchLink ] = useState(event?.liveStreamURL || '');
  const [ frequency, setFrequency ] = useState(event?.frequency || '');
  const [ recurring, setRecurring ] = useState(event?.recurring);

  console.log(event)
  const updateEvent = async (e) => {
    e?.preventDefault();
    const eventUpdate = {
      date: dayjs(date).toDate().toString(),
      time,
      recurring, name,
      bio: description.trim(),
      liveStreamURL: watchLink.trim(),
    }
    try {
      // await updateDoc(doc(db, `pages/${currentPage.handle}/events`, event.id), eventUpdate);
      const updatedEvent = await event.update(eventUpdate)
      if(updatedEvent){
        setEvent(updatedEvent);
      }
    } catch (err) {
      console.log('Error updating event')
      console.log(err);
    }
  }

  const removeEvent = async (e) => {
    try {
        const success = await currentPage.deleteEvent(e);
        if(success){
          navigate(`/${currentPage.handle}/events`);
          setEvent(null);
        }
      } catch (err) {
        console.log('Error deleting event')
        console.log(err);
      }    
  }

  const toEventsPage = () => {
    setEvent(null);
    navigate(`/${currentPage.handle}/events`);
  }

  const startEvent = async () => {
    const update = { hasStarted: true, startTimestamp: new Date().getTime() }
    try {
      const updatedEvent = await event.update(update)
      if(updatedEvent){
        setEvent(updatedEvent);
      }
    } catch (err) {
      console.log('Error updating event')
      console.log(err);
    }
  }

  const endEvent = async () => {
    try {
      console.log('Calculating total attendance')
      const totalAttendance = await event.getTotalAttendance();
      const update = { hasEnded: true, endTimestamp: new Date().getTime(), totalAttendance: totalAttendance};
      try {
        const updatedEvent = await event.update(update)
        if(updatedEvent){
          setEvent(updatedEvent);
        }
      } catch (err) {
        console.log('Error updating event')
        console.log(err);
      }

    }catch (err){
      console.log('Error calculating total attendance')
      console.log(err);
    }
    
  }

  const frequencyOptions = [ {value: 'DAILY', label: 'Daily'}, {value: 'WEEKLY', label: 'Weekly'}, {value: 'MONTHLY', label: 'Monthly'} ];
  
  return (
    <>
      { error? <ErrorPage /> :
      <Container component="main" maxWidth="xs" sx={{}}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%',  }} >
          <Typography component="h1" variant="h5">{event?.name.toUpperCase()}</Typography>
          <Box component="form" onSubmit={updateEvent} sx={{ mt: 3,  height:'100%', overflowY: 'auto', paddingTop:1}} onChange={() => setUpdated(true)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField required fullWidth label="Event Title" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required fullWidth type="date" id="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} >
                <TextField required fullWidth type="time" id="time" label="Time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth multiline label="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Grid>            
            <Grid item xs={12} sm={6} >
              <FormControlLabel control={<Checkbox onChange={() => setRecurring(!recurring)} />} label="Recurring" />
              { !recurring? <></> :
              <TextField required={recurring} fullWidth select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                {frequencyOptions.map((e,i) => (
                  <MenuItem key={i} value={e.value}>{e.value}</MenuItem>
                ))}
              </TextField>
              }
            </Grid>
            {/* <Grid item xs={12} >
              <TextField required fullWidth label="Watch Link" id="watch-link" value={watchLink} onChange={(e) => setWatchLink(e.target.value)}/>
            </Grid> */}
          </Grid>
          <Button type="submit" fullWidth variant="contained" disabled={!updated} sx={{ mt: 3, }} >Save</Button>
          </Box>
          {event?.hasStarted && !event?.hasEnded? 
          <Button fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} onClick={endEvent} color={'error'}>
            End Event
          </Button> : <Button fullWidth variant="contained" disabled={!isToday || event.hasEnded} sx={{ mt: 2, mb: 2 }} onClick={startEvent} color={'primary'}>
            Start Event
          </Button>
          }
          <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant='p' onClick={toEventsPage} >Back</Typography>
              </Grid>
              <Grid item>
                <Typography variant='p' onClick={() => removeEvent(event)} >Delete</Typography>
              </Grid>
          </Grid>
        </Box>
      </Container>
      }
    </>
  )
}
