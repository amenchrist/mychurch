import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { emailRegex } from '../../regex';
// import useEmailChecker from '../../hooks/useEmailChecker';

export default function EmailForm() {

  const { user, setUser, serverIsOnline } = useStateContext();
  const [ email, setEmail ] = useState(user.email)
  const [ valid, setValid ] = useState(true);
  const [ processingRequested, setProcessingRequested ] = useState(false)

  const handleValidation = (value) => {
    //set email to user input
    setEmail(value.toLowerCase());

    //define regex     
    const reg = new RegExp(emailRegex); 
      
    //test whether input is valid
    setValid(reg.test(value));

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(email && valid) {
      setProcessingRequested(true)
    }
  }

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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!serverIsOnline}
        >
          Submit
        </Button>
      </Box>
    </>
  )
}