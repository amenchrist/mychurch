import React, { useState, useEffect } from 'react';
import { Button, TextField,  Grid, Box, MenuItem,  } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { getDateValues } from '../../functions';
import { attendanceRegex, phoneRegex } from '../../regex';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useMyStore } from '../../store';
// import useAttendanceLogger from '../../hooks/useAttendanceLogger';

export default function AttendanceForm({isAnAdmin}) {

    const { orgDetails, geolocation } = useStateContext();    
    const { user, setUser,} = useMyStore();

    const [ attendance, setAttendance ] = useState(1)
    // const [ valid, setValid ] = useState(true);
    const [ church, setChurch ] = useState('CE BARKING');
    const [ attendanceRecord, setAttendanceRecord ] = useState({});
    const [ processingRequested, setProcessingRequested ] = useState(false);

    const [ phone, setPhone ] = useState('');

    const [ validPhone, setValidPhone ] = useState(false);
    const [ validAttendance, setValidAttendance ] = useState(true);

    const [ valid, setValid ] = useState(false);

    useEffect(() => {
       console.log("Valid = ", valid)
      if( validPhone && validAttendance ){
        setValid(true)
      } else if (user.phoneExists && validPhone === false){
        setValidPhone(true)
      }
      else {
        setValid(false)
      }
    }, [validPhone, validAttendance, valid, user.phoneExists ])

    const handleValidation = (value, setFunc, valFunc, regex) => {
        //set email to user input
        setFunc(value);
        
        //define regex     
        const reg = new RegExp(regex); 
        
        //test whether input is valid
        valFunc(reg.test(value));
    };

    // const handleValidation = (value) => {
              
    //     //define regex     
    //     const reg = new RegExp(attendanceRegex); 
        
    //     //test whether input is valid
    //     setValid(reg.test(value) );

    //     //set email to user input
    //     setAttendance(value);
    // };

    const handleAttendance = (event) => {

      event.preventDefault();
   
      if(attendance && valid){
        
        const dateValues = getDateValues(new Date());

        setAttendanceRecord({
            id: uuidv4().split('-').join(""),
            email: user.email ,
            date: dateValues.date,
            day: dateValues.day,
            time: dateValues.time,
            church: church,
            attendance: attendance,
            origin: orgDetails.url,
            ip: geolocation.IPv4,
            deviceWidth: window.innerWidth,
            deviceHeight: window.innerHeight,
            phone
        })

        setProcessingRequested(true)
      }
    }

    //submit attendance
    // const attendanceSubmitted = useAttendanceLogger(attendanceRecord, processingRequested);

    // useEffect(() => {
    //   if(attendanceSubmitted){
    //     setProcessingRequested(false)
    //     const { attendanceRecords } = user
    //     setUser({...user, attendanceRecords: [attendanceRecord, ...attendanceRecords], attendanceSubmitted})
    //   }
    // }, [attendanceSubmitted])

    const churches = [
      'CE LOVE CHURCH BARKING', 'CE BARKING', 'CE EAST HAM', 'CE ILFORD', 'CE MEDWAY', 'CE PORTSMOUTH', 'CE HARLOW',
      'CE BELFAST', 'CE BRISTOL 1', 'CE BRISTOL 2', 'CE LOVE CHURCH BRISTOL', 'CE THURROCK', 'CE COLCHESTER',
      'CE DOCKLANDS', 'CE GLOUCESTER', 'CE BATH', 'CE BASILDON', 'CE ROMFORD', 'CE STRATFORD',
      'CE CYPRUS', 'CE LOVE CHURCH DAGENHAM', 'OTHER'
    ]
    
    return (
      <>
      <Box component="form" onSubmit={handleAttendance} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user.email}
              disabled
              
            />
          </Grid>
          {user.phoneExists? <></> : 
          <Grid item xs={12}>
            <TextField
              autoFocus
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
          }
          <Grid item xs={12} >
            <TextField required select fullWidth id="title" label="Select Your Church" name="church" value={church} autoComplete="church" autoFocus onChange={(e) => setChurch(e.target.value)} >
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
          disabled={!valid}
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
      
      {isAnAdmin ? <Link to={'/admin-dashboard'} style={{textDecoration: 'none'}} >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Visit Admin Portal
        </Button>
        </Link>
        :
        <></>
      }
      </>
    )
}