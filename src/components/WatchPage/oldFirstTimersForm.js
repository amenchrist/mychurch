import React, { useEffect, useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, MenuItem, Typography  } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { getDateValues } from '../../functions';
import { attendanceRegex, nameRegex, phoneRegex } from '../../regex';
import { v4 as uuidv4 } from 'uuid';
import { useMyStore } from '../../store';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';

export default function OldFirstTimersForm() {

  const { user, setUser,} = useMyStore();
  
  const { attendeeEmail, setIsRegistered } = useWatchPageContext();
  const { orgDetails, geolocation } = useStateContext();


  const [ attendanceRecord, setAttendanceRecord ] = useState({});
  const [ processingRequested, setProcessingRequested ] = useState(false);

  const [ attendance, setAttendance ] = useState(1)
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ church, setChurch ] = useState('CE BARKING');
    
  const [ validAttendance, setValidAttendance ] = useState(true);
  const [ validFirstName, setValidFirstName ] = useState(false);
  const [ validLastName, setValidLastName ] = useState(false);
  const [ validPhone, setValidPhone ] = useState(false);

  const [ valid, setValid ] = useState(false);

  useEffect(() => {
    // console.log("Valid = ", valid)
    if(validFirstName && validLastName && validPhone && validAttendance ){
      setValid(true)
    } else {
      setValid(false)
    }
  }, [validFirstName, validLastName, validPhone, validAttendance, valid ])

  const handleValidation = (value, setFunc, valFunc, regex) => {
      //set email to user input
      setFunc(value);
      
      //define regex     
      const reg = new RegExp(regex); 
      
      //test whether input is valid
      valFunc(reg.test(value));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    
    if(valid){

      const dateValues = getDateValues(new Date());

      setAttendanceRecord({
        id: uuidv4().split('-').join(""),
        email:user.email,
        date: dateValues.date,
        day: dateValues.day,
        time: dateValues.time,
        church,
        attendance,
        origin: orgDetails.url,
        primaryAttendee: firstName,
        lastName: lastName,
        primaryAttendeeTitle: title,
        phone,
        ip: geolocation.IPv4,
        deviceWidth: window.innerWidth,
        deviceHeight: window.innerHeight
      })

      setProcessingRequested(true)

    }
  };

  //submit attendance
  // const attendanceSubmitted = useAttendanceLogger(attendanceRecord, processingRequested);

  // useEffect(() => {
  //   if(attendanceSubmitted){
  //     setProcessingRequested(false);
  //     const { attendanceRecords } = user;
  //     setUser({...user, attendanceRecords: [attendanceRecord, ...attendanceRecords], attendanceSubmitted});
  //   }
  // }, [attendanceSubmitted, user, attendanceRecord, setUser])

  const titles = [
    {
      value: 'Mr.',
      label: 'Mr.',
    },
    {
      value: 'Ms.',
      label: 'Ms.',
    },
    {
      value: 'Mrs.',
      label: 'Mrs.',
    },
    {
      value: 'Brother',
      label: 'Brother',
    },
    {
      value: 'Sister',
      label: 'Sister',
    },
    {
      value: 'Pastor',
      label: 'Pastor',
    },

    {
      value: 'Deacon',
      label: 'Deacon',
    },
    {
      value: 'Deaconess',
      label: 'Deaconess',
    },
    {
      value: 'Rev.',
      label: 'Rev.',
    },
    {
      value: 'Dr.',
      label: 'Dr.',
    },
  ]

  const churches = [
    'CE LOVE CHURCH BARKING', 'CE BARKING', 'CE EAST HAM', 'CE ILFORD', 'CE MEDWAY', 'CE PORTSMOUTH', 'CE HARLOW',
    'CE BELFAST', 'CE BRISTOL 1', 'CE BRISTOL 2', 'CE LOVE CHURCH BRISTOL', 'CE THURROCK', 'CE COLCHESTER',
    'CE DOCKLANDS', 'CE GLOUCESTER', 'CE BATH', 'CE BASILDON', 'CE ROMFORD', 'CE STRATFORD',
    'CE CYPRUS', 'CE LOVE CHURCH DAGENHAM', 'OTHER'
  ]

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, height: '200px', overflowY:'auto'}} >
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant='p' onClick={() => setIsRegistered(true)} >Back</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={attendeeEmail}
            disabled
          />
        </Grid>
        <Grid item xs={12} >
          <TextField required select fullWidth id="title" label="Title" name="title" value={title} autoComplete="title" autoFocus onChange={(e) => setTitle(e.target.value)} >
            {titles.map((title) => (<MenuItem key={title.value} value={title.value}>{title.label}</MenuItem>))}
          </TextField>
        </Grid>
        <Grid item xs={12} >
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            error={!validFirstName}
            value={firstName}
            onChange={(e) => handleValidation(e.target.value, setFirstName, setValidFirstName, nameRegex)}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            autoComplete="family-name"
            name="lastName"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            error={!validLastName}
            value={lastName}
            onChange={(e) => handleValidation(e.target.value, setLastName, setValidLastName, nameRegex)}
          />
        </Grid>            
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            error={!validPhone}
            value={phone}
            onChange={(e) => handleValidation(e.target.value, setPhone, setValidPhone, phoneRegex)}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField required select fullWidth id="title" label="Select Your Church" name="church" value={church} autoComplete="church" onChange={(e) => setChurch(e.target.value)} >
            {churches.map((church) => (<MenuItem key={church} value={church}>{church}</MenuItem>))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
        <TextField
              required
              fullWidth
              name="attendance"
              label="Number of People Watching"
              id="attendance"
              type='number'
              error={!validAttendance}
              value={attendance}
              onChange={(e) => handleValidation(e.target.value, setAttendance, setValidAttendance, attendanceRegex)}
            />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, and updates via email."
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  )
}
