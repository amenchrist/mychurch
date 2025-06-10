import React from 'react';
import { useState } from "react";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRegistrationPageContext } from '../../../contexts/RegistrationContextProvider';
import { checkEmail } from '../../../dbQueryFunctions';
import { MuiTelInput } from 'mui-tel-input';

export default function AccountInfo() {

  const { setStage, userDetails, setUserDetails, } = useRegistrationPageContext();

  const [ error, setError ] = useState(false);
  const [ email, setEmail ] = useState(userDetails.email || "");
  const [ password, setPassword ] = useState(userDetails.password || "");
  const [ phoneNumber, setPhoneNumber ] = useState(userDetails.phoneNumber);
  const [ emailExists, setEmailExists ] = useState(false);
  const [ church, setChurch ] = useState(userDetails.church)
  

  const handleSubmit = e => {
    e.preventDefault();
    setUserDetails({ email, password, church, phoneNumber})
    setStage(2);
  }

  const Notice = ({type, message}) => {
    return (
    <Alert severity={type}>
      <AlertTitle>{type.toUpperCase()}</AlertTitle>
      {message}
    </Alert>)
  }

  const churches = [ {name: 'Christ Embassy Barking', handle: 'cebarking'}, {name: 'Christ Embassy Ilford', handle: 'ceilford'}]

  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt:2, p:1, overflowY: 'auto'}} onFocus={() => setError(false)} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Account Info</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="email" label="Email Address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={emailExists} onBlur={() => setEmailExists(checkEmail(email))} />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth label="Password" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <MuiTelInput label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e)} />
        </Grid>
        <Grid item xs={12} >
          <TextField required select fullWidth id="Church" label="Church" name="title" value={church} autoComplete="title" autoFocus onChange={(e) => setChurch(e.target.value)} >
            {churches.map((c) => (<MenuItem key={c.handle} value={c.handle}>{c.name}</MenuItem>))}
          </TextField>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Continue</Button>
    </Box>
  );
    
}

