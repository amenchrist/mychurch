import React from 'react';
import { Box, Button, Checkbox, Container, Grid, TextField, Typography } from '@mui/material';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import dayjs from 'dayjs';


export default function EventReport() {
  const { event, setShowEventReport } = useDashboardContext();
  const { name, date, bio: description, liveStreamURL: watchLink} = event

  return (
    <Container component="main" maxWidth="xs" sx={{}}>
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%',  }} >
      <Typography component="h1" variant="h5">{event?.name.toUpperCase()}</Typography>
      <Box component="form" disabled sx={{ mt: 3,  height:'100%', overflowY: 'auto', paddingTop:1}} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField disabled fullWidth label="Event Title" id="name" value={name}  />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField disabled fullWidth type="date" id="date" label="Date" value={dayjs(date).format('YYYY-MM-DD')} />
        </Grid>
        <Grid item xs={12} sm={6} >
            <TextField disabled fullWidth type="time" id="time" label="Time"  value={dayjs(date).format('HH:mm')} />
        </Grid>
        <Grid item xs={12}>
            <TextField disabled fullWidth multiline label="Description" id="description" value={description} />
        </Grid>            
        <Grid item xs={12} >
          <TextField disabled fullWidth label="Watch Link" id="watch-link" value={watchLink} />
        </Grid>
      </Grid>
      <Grid container sx={{mt:2}} justifyContent="space-between">
          <Grid item>
            <Typography variant='p' onClick={() => setShowEventReport(false)} >Back</Typography>
          </Grid>
          <Grid item>
            <Typography variant='p' onClick={() => setShowEventReport(false)} >Total Attendance: {event.totalAttendance}</Typography>
          </Grid>
          {/* <Grid item>
            <Typography variant='p' onClick={deleteEvent} >Delete</Typography>
          </Grid> */}
      </Grid>
    </Box>
    </Box>
  </Container>
  )
}
