import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Box, Typography, MenuItem, } from '@mui/material';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { osName, deviceDetect, deviceType } from 'react-device-detect';
import { useGeolocated } from "react-geolocated";
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import { useMyStore } from '../../store';
import { attendanceRegex } from '../../regex';
import { db } from '../../config/firebase';
import { handleValidation, churches } from './formAssets';

export default function AttendanceForm() {

  const { currentPage, event } = useMyStore();

  const { attendeeEmail, setAttendanceCaptured, userIsParticipant, setEmailCaptured, setAttendeeEmail, setUserIsParticipant } = useWatchPageContext();

  const [ attendance, setAttendance ] = useState(false);
  const [ validAttendance, setValidAttendance ] = useState(true);
  const [ church, setChurch] = useState('')
  const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
  });

  const handleAttendance = async (e) => {
    e.preventDefault();

    if(userIsParticipant){
      //Update Doc
      try {
        await updateDoc(doc(db, `pages/${currentPage.handle}/events/${event.id}/attendanceRecords`, attendeeEmail), { attendance: attendance, });
        setAttendanceCaptured(true);
      } catch (err) {
        console.log('Error updating event attendance records');
        console.log(err);
      }

    } else {
      //add new attendance record
      const attendanceRecord = {
        id: `att_${uuidv4().split('-').join("")}`,
        email: attendeeEmail ,
        timestamp: new Date().getTime(),
        church,
        attendance: attendance,
        geolocation: {...coords},
        // origin: orgDetails.url,
        osName,  deviceType,
        device: {...deviceDetect},
        playerStartTime: null,
        playerStopTime: null
      }

      try {
        await setDoc(doc(db, `pages/${currentPage.handle}/events/${event.id}/attendanceRecords`, attendeeEmail), attendanceRecord);

        setAttendanceCaptured(true);
      } catch (err) {
        console.log('Error adding event attendance records');
        console.log(err);
      }
    }				

  }

  return (
  <Box component="form" onSubmit={handleAttendance} sx={{ mt: 3 }}>
    <Grid container spacing={2}>
      {/* <Grid item xs={12} >
        <TextField required select fullWidth id="Church" label="Church" name="Church" value={church} autoComplete="title" autoFocus onChange={(e) => setChurch(e.target.value)} >
          {churches.map((church) => (<MenuItem key={church.value} value={church.value}>{church.label}</MenuItem>))}
        </TextField>
      </Grid> */}
      <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="church"
            label="Church"
            name="church"
            autoComplete="church"
            value={church}
            onChange={(e) => setChurch(e.target.value)}
          />
        </Grid>
      <Grid item xs={12}>
          <TextField
          required
          fullWidth
          name="attendance"
          label="Number of People Watching"
          id="attendance"
          type='number'
          min='1'
          value={attendance}
          onChange={(e) => handleValidation(e.target.value, setAttendance, setValidAttendance, attendanceRegex)}
          error={!validAttendance}
          />
      </Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={!validAttendance}
      sx={{ mt: 3, mb: 2 }}
    >
      Submit
    </Button>
    <Grid container justifyContent="flex-end">
        <Grid item>
          <Typography variant='p' onClick={() => {setEmailCaptured(false); setUserIsParticipant(false)}} >Back</Typography>
        </Grid>
    </Grid>
  </Box>
  )
}
