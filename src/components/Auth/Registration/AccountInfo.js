import React from 'react';
import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRegistrationPageContext } from '../../../contexts/RegistrationContextProvider';

export default function AccountInfo() {

  const { setStage, setCredentials } = useRegistrationPageContext();

  const [ error, setError ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ handle, setHandle ] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    setCredentials({ email, password, handle})
    setStage(2);
  }

  const Notice = ({type, message}) => {
    return (
    <Alert severity={type}>
      <AlertTitle>{type.toUpperCase()}</AlertTitle>
      {message}
    </Alert>)
  }
  
  return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt:2, p:1, overflowY: 'auto'}} onFocus={() => setError(false)} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Account Info</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth id="email" label="Email Address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth label="Password" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
          <TextField required fullWidth id="handle" label="handle" placeholder="" value={handle} onChange={(e) => setHandle(e.target.value)} />
          </Grid>         
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Continue</Button>
      </Box>
  );
    
}

