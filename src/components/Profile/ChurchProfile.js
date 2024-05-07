import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useMyStore } from '../../store';


function ChurchProfile() {

  const { currentPage } = useMyStore();
  const [ email, setEmail ] = useState(currentPage.contactInfo.email);
  const [ handle, setHandle] = useState(currentPage.handle);
  const [ name, setName] = useState(currentPage.name);
  const [ streamURL, setStreamURL] = useState(currentPage.liveStreamURL);


  const [ updated, setUpdated ] = useState(false)

  return (
    <Container component="main" maxWidth="xs" sx={{}}>
      <Typography component="h1" variant="h5">Profile</Typography>

      <Box component="form"  sx={{ mt:2, p:1, overflowY: 'auto'}} onChange={() => setUpdated(true)} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Account Info</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>   
          <Grid item xs={12}>
            <TextField required fullWidth label="Email Address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
          <TextField required fullWidth label="Handle" value={handle} onChange={(e) => setHandle(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
          <TextField required fullWidth label="Stream URL" value={streamURL} onChange={(e) => setStreamURL(e.target.value)} />
          </Grid>         
        </Grid>
        <Button type="submit" disabled={!updated} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Update</Button>
      </Box>
    </Container>
  )
}

export default ChurchProfile