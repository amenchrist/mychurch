import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { emailRegex } from '../../regex';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useMyStore } from '../../store';
// import useEmailChecker from '../../hooks/useEmailChecker';

export default function EmailForm() {

  const { user, setUser } = useMyStore();
  const [ email, setEmail ] = useState(() => user? user.email: '')
  const [ valid, setValid ] = useState(true);
  const [ isRegistered, setIsRegistered ] = useState(true);
  const [ enableLogIn, setEnableLogin ] = useState(false)

  const handleValidation = (value) => {

    setIsRegistered(true)
    //set email to user input
    setEmail(value.toLowerCase());

    //define regex     
    const reg = new RegExp(emailRegex); 
      
    //test whether input is valid
    setValid(reg.test(value));

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(email && valid && isRegistered) {
      (async () => {
        try {
          const docRef = doc(db, 'userProfiles', email)
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()){
            const data = docSnap.data();
            // setUser({...{}, ...docSnap.data()});
            console.log(data)
            setUser({...{}, email, isRegistered, phoneExists: data.contactInfo.phoneNumber? true : false });
          } else {
            console.log('User Profile not found');
            setIsRegistered(false)
          }
        } catch (err) {
          console.log("Error fetching doc");
          console.log(err)
          setIsRegistered(false);
        }
      })()
    } 
  }

  const startRegistration = () => {
    if(email && valid){
      setUser({...{}, email, isRegistered: false });
    } else {
      setValid(false)
    }
  }

  useEffect(() => {
    if(valid && isRegistered){
      setEnableLogin(true)
    } else {
      setEnableLogin(false)
    }
  }, [valid, isRegistered])

  //Check if email exists   
  // const [ isRegistered, emailChecked, isAnAdmin, phoneExists ] = useEmailChecker(email, processingRequested); 

  // useEffect(() => {
  //   if(emailChecked){
  //     setProcessingRequested(false)
  //     setUser({...user, email, emailChecked, isRegistered, isAnAdmin, phoneExists });
  //   }
  // }, [emailChecked, setUser, user, email, isRegistered, isAnAdmin, phoneExists])

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}  >
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              error={!valid}
              autoFocus
              onChange={(e) => handleValidation(e.target.value)}
            />
          </Grid>
        </Grid>
        {!isRegistered? <Typography component="h5" variant="p" sx={{ mt: 2,  textAlign: 'center', color: 'red' }}>
            Email not found
        </Typography> : <></> }
        
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
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt:1, mb: 2 }}
        onClick={startRegistration}
      >
        I'm New Here
      </Button>
    </>
  )
}