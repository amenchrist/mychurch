import { Box, Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Event } from '../classes';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';


export default function EventPage({setNewEvent}) {  

  const { setEvent, currentPage, event } = useMyStore();
  const navigate = useNavigate();

  const [ date, setDate ] = useState(event.date);
  const [ time, setTime ] = useState(event.time || '');
  const [ name, setName ] = useState(event.name);
  const [ description, setDescription ] = useState(event.bio || '');
  const [ watchLink, setWatchLink ] = useState(event.liveStreamURL || '');
  const [ frequency, setFrequency ] = useState(event.frequency || '');
  const [ recurring, setRecurring ] = useState(event.recurring);


  const updateEvent = async (e) => {
    e.preventDefault()

    const eventUpdate = {
      date,
      time,
      recurring,
      bio: description,
      liveStreamURL: watchLink,
      name
    }

    // console.log(eventUpdate)

    try {
      await setDoc(doc(db, 'events', event.id), eventUpdate, { merge: true });
      console.log('Event Updated');
      const updatedEvent = new Event({...eventUpdate, id: event.id })
      setEvent(updatedEvent);
    //   navigate(location.pathname);
    } catch (err) {
      console.log('Error updating event')
      console.log(err);
    }
  }


  const frequencyOptions = [ {value: 'DAILY', label: 'Daily'}, {value: 'WEEKLY', label: 'Weekly'}, {value: 'MONTHLY', label: 'Monthly'} ];
  
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{}}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%', }} >
          <Typography component="h1" variant="h5">{event.name}</Typography>
          <Box component="form" onSubmit={updateEvent} sx={{ mt: 3,  height:'100%', overflowY: 'auto'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField autoFocus required fullWidth label="Event Title" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
            <TextField required fullWidth multiline label="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField required fullWidth type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} >
            <TextField required fullWidth type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
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
            <Grid item xs={12} >
            <TextField required fullWidth label="Watch Link" id="watch-link" value={watchLink} onChange={(e) => setWatchLink(e.target.value)}/>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Save</Button>
          <Grid container justifyContent="flex-start">
              <Grid item>
              {/* <Link href="/" variant="body2">Cancel</Link> */}
              <Typography variant='p' onClick={()=> navigate(`/${currentPage.handle}/events`)} >Back</Typography>
              </Grid>
          </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
