import React from 'react';
import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRegistrationPageContext } from '../../../contexts/RegistrationContextProvider';

export default function ContactInfoForm() {

  const { setAddress, signUp, setStage } = useRegistrationPageContext();


  const [ error, setError ] = useState(false);
  const [ houseNameOrNumber, setHouseNameOrNumber ] = useState('');  
  const [ street, setStreet ] = useState('');  
  const [ cityOrTown, setCityOrTown ] = useState('');  
  const [ state, setState ] = useState('');  
  const [ county, setCounty ] = useState('');  
  const [ country, setCountry ] = useState('');  
  const [ postOrZipCode, setPostOrZipCode ] = useState('');  

  
  const address = { houseNameOrNumber, street, cityOrTown, state, county, country, postOrZipCode }

  const handleSubmit = e => {
    e.preventDefault();
    setAddress(address);
    signUp();
  }

  return (
    <Box component="form" onSubmit={handleSubmit } sx={{ mt:2, p:2, overflowY: 'auto'}} onFocus={() => setError(false)} >
      <Grid container spacing={2}>
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <Typography>Contact Info</Typography>
          </Grid>
          <Grid item>
            <Typography onClick={() => setStage(2)} >{'<--'}</Typography>
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <TextField fullWidth label="House Name of Number" type="text" id="houseNameOrNumber" value={houseNameOrNumber} onChange={(e) => setHouseNameOrNumber(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Street" type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="City/Town" type="text" id="cityOrTown" value={cityOrTown} onChange={(e) => setCityOrTown(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="State" type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="County" type="text" id="county" value={county} onChange={(e) => setCounty(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Country" type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Postcode / Zip code" type="text" id="postOrZipCode" value={postOrZipCode} onChange={(e) => setPostOrZipCode(e.target.value)} />
        </Grid>        
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign Up</Button>
    </Box>
  )
}