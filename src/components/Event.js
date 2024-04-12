import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function Event({setNewEvent}) {  

  const [ date, setDate ] = useState(null);
  const [ time, setTime ] = useState(null);
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ watchLink, setWatchLink ] = useState('');
  const [ frequency, setFrequency ] = useState('');


  const createEvent = () => {

  }

  const frequencyOptions = [ {value: 'DAILY', label: 'Daily'}, {value: 'WEEKLY', label: 'Weekly'}, {value: 'MONTHLY', label: 'Monthly'} ];
  
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{}}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%', }} >
          <Typography component="h1" variant="h5">New Event</Typography>
          <Box component="form" onSubmit={createEvent} sx={{ mt: 3,  height:'100%', overflowY: 'auto'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField autoFocus required fullWidth label="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
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
              <TextField required fullWidth select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                {frequencyOptions.map((e,i) => (
                  <MenuItem key={i} value={e.value}>{e.value}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} >
            <TextField required fullWidth label="Watch Link" id="watch-link" value={watchLink} onChange={(e) => setWatchLink(e.target.value)}/>
            </Grid>
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
