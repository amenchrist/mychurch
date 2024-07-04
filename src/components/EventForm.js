import { Box, Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { v4 as uuidv4 } from 'uuid';
import { useMyStore } from '../store';
import { useNavigate,} from 'react-router-dom';
import dayjs from 'dayjs';
import Event from '../classes/Event';


export default function EventForm({setNewEvent}) {  

  const { user, currentPage } = useMyStore();
  const navigate = useNavigate();

  const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
  const [ time, setTime ] = useState(dayjs().format('HH:mm'));
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ watchLink, setWatchLink ] = useState('https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8');
  const [ frequency, setFrequency ] = useState('WEEKLY');
  const [ recurring, setRecurring ] = useState(false);
  const [ reEndDate, setReEndDate ] = useState(dayjs().format('YYYY-MM-DD'));

  const handleSubmit = (e) => {
    e.preventDefault();
    if(recurring){
      const start = dayjs(date).toDate();
      const current = dayjs(date).toDate();
      const end = dayjs(reEndDate).toDate();

      const dates = [];
      while (current <= end){
        switch(frequency){
          case 'WEEKLY':
            if(current.getDay() === start.getDay()){
              dates.push(dayjs(new Date(current)).format('YYYY-MM-DD'))
            }
            current.setDate(current.getDate()+ 1)
            break;
          case 'MONTHLY':
            //SAME Day EVERY MONTH
            if(current.getDate() === start.getDate()){
              dates.push(dayjs(new Date(current)).format('YYYY-MM-DD'))
            }
            current.setMonth(current.getMonth() + 1);
            current.setDate(1);
            break;
          default:
            //Every day till end date
            dates.push(dayjs(new Date(current)).format('YYYY-MM-DD'))
            current.setDate(current.getDate()+ 1)
        }
      }

      dates.forEach(d => {
        createEvent(d)
      } )

    } else {
      createEvent(date)
    }

  }

  const createEvent = async (startDate) => { 
    const newEvent = {
      id: `ev_${uuidv4()}`,
      parentPageHandle: currentPage.handle,
      creatorID: user.id,
      recurring,
      bio: description,
      liveStreamURL: watchLink.trim(),
      name,
      date: dayjs(`${startDate}`).toDate().toString(),
      time
    }
    const success = await currentPage.addEvent(new Event(newEvent))
    if(success){
      navigate(`/${currentPage.handle}/events`);
    }
  }

  const frequencyOptions = [ {value: 'DAILY', label: 'Daily'}, {value: 'WEEKLY', label: 'Weekly'}, {value: 'MONTHLY', label: 'Monthly'} ];
  
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{}}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%', }} >
          <Typography component="h1" variant="h5">New Event</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3,  height:'100%', overflowY: 'auto', paddingTop:1}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField autoFocus required fullWidth label="Event Title" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField required fullWidth type="time" label="Time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline label="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Grid>
            <Grid item xs={12} >
              <FormControlLabel control={<Checkbox onChange={() => setRecurring(!recurring)} checked={recurring} />} label="Recurring" />
              </Grid>
              { !recurring? <></> :
              <>
              <Grid item xs={12} sm={6} >
                <TextField required={recurring} fullWidth select label="Frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                {frequencyOptions.map((e,i) => (
                  <MenuItem key={i} value={e.value}>{e.value}</MenuItem>
                ))}
              </TextField>
              </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField required fullWidth type="date" label="End Date" value={reEndDate} onChange={(e) => setReEndDate(e.target.value)} />
                </Grid>
              </>              
              }
            {/* <Grid item xs={12} >
            <TextField required fullWidth label="Watch Link" id="watch-link" value={watchLink} onChange={(e) => setWatchLink(e.target.value)}/>
            </Grid> */}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Save</Button>
          <Grid container justifyContent="flex-start">
              <Grid item>
              {/* <Link href="/" variant="body2">Cancel</Link> */}
              <Typography variant='p' onClick={()=> setNewEvent(false)} >Back</Typography>
              </Grid>
          </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
