import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { emailRegex } from '../../regex';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import { useMyStore } from '../../store';

export default function EmailForm() {

  const { user, setUser } = useMyStore();
  
  const { attendeeEmail, setAttendeeEmail, attendanceCaptured, setIsRegistered, setEmailCaptured } = useWatchPageContext();
  
  const [ emailFound, setEmailFound ] = useState(true);
  const [ email, setEmail ] = useState(attendeeEmail);
  const [ valid, setValid ] = useState(true);
  const [ enableLogIn, setEnableLogin ] = useState(false);

  const handleValidation = (value) => {

    setEmailFound(true)
    //set email to user input
    setEmail(value.toLowerCase());

    //define regex     
    const reg = new RegExp(emailRegex); 
      
    //test whether input is valid
    setValid(reg.test(value));

  };

  useEffect(() =>{
    if(valid){
      setEnableLogin(true);
    } else {
      setEnableLogin(false);
    }
  }, [valid])

  const handleSubmit = (e) => {
    e.preventDefault();
    checkEmail()
  }
  const checkEmail = () => {
    setAttendeeEmail(email);
    (async () => {
      try {
        const docRef = doc(db, 'userProfiles', email)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          const data = docSnap.data();
          // console.log(data)
          setUser({...{}, title: data.bioData.title, firstName: data.bioData.firstName, lastName: data.bioData.lastName,});
          // console.log("Email exists");
          // setIsRegistered(true)
          setEmailCaptured(true)
          // setAttendeeEmail(email)
        } else {
          setEnableLogin(false);
          setEmailFound(false);
        }
      } catch (err) {
        console.log("Error validating email");
        // console.log(err)
      }
    })()

  }  
  

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}  >
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} error={!valid} autoFocus 
            onChange={(e) => handleValidation(e.target.value)}
            />
          </Grid>
        </Grid>
        {!emailFound? <Typography component="h5" variant="p" sx={{ mt: 2,  textAlign: 'center', color: 'red' }}>
            Email not found! Are you new here?
        </Typography> : <></> }
        {emailFound? <></> :
          <Button type="submit" fullWidth variant="outlined" sx={{ mt:1, mb: 2 }} onClick={() => setIsRegistered(false)} >
          I'm New Here
          </Button>
          }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          disabled={!enableLogIn}
        >
          Join Meeting
        </Button>
      </Box>
    </>
  )
}
