import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useMyStore } from '../../store';


function ChurchProfile() {

  const { currentPage, setCurrentPage } = useMyStore();
  const [ email, setEmail ] = useState(currentPage.contactInfo?.email || '');
  const [ handle, setHandle] = useState(currentPage.handle);
  const [ name, setName] = useState(currentPage.name);
  const [ streamURL, setStreamURL] = useState(currentPage.liveStreamURL);
  const [ websiteURL, setWebsiteURL] = useState(currentPage.websiteURL || '');


  const [ updated, setUpdated ] = useState(false);

  const updatePage = async (e) => {
    
    e.preventDefault();
    const pageUpdate = {
      contactInfo: {email}, 
      name, liveStreamURL: streamURL, websiteURL
    }
    try {
      const updatedPage = await currentPage.update(pageUpdate)
      if(updatedPage){
        setCurrentPage(updatedPage);
        setUpdated(false)
      }
    } catch (err) {
      console.log('Error updating event')
      console.log(err);
    }
  }

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
          <Grid item xs={12}>
          <TextField required fullWidth label="Website URL" value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} />
          </Grid>         
        </Grid>
        <Button type="submit" onClick={updatePage} disabled={!updated} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Update</Button>
      </Box>
    </Container>
  )
}

export default ChurchProfile