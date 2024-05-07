import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useMyStore } from '../../store';

export default function UserProfile() {
  const { currentPage, user } = useMyStore();
  const [ email, setEmail ] = useState(currentPage.contactInfo.email);
  const [ title, setTitle ] = useState(user.bioData.title || '');
  const [ firstName, setFirstName ] = useState(user.bioData.firstName);
  const [ lastName, setLastName ] = useState(user.bioData.lastName);

  // const [ middleName, setMiddleName ] = useState(user.bioData.middleName || '');
  const [ gender, setGender ] = useState(user.bioData.gender || '');
  const [ dateOfBirth, setDateOfBirth ] = useState(user.bioData.dateOfBirth ||'');
  const [ maritalStatus, setMaritalStatus ] = useState(user.bioData.maritalStatus ||'');
  const [ nationality, setNationality ] = useState(user.bioData.nationality ||'');


  const [ updated, setUpdated ] = useState(false)

  return (
    <Container component="main" maxWidth="xs" sx={{}}>
      <Typography component="h1" variant="h5">Profile</Typography>
      <Box component="form"  sx={{ mt:2, p:1, overflowY: 'auto'}} onChange={() => setUpdated(true)} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Account Info</Typography>
          </Grid> 
          <Grid item xs={12} >
            <TextField autoFocus required fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField autoFocus required fullWidth autoComplete="given-name" label="First Name" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth autoComplete="family-name" label="Last Name" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth label="Email Address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Gender" type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Date of Birth" type="text" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Marital Status" type="text" id="maritalStatus" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Nationality" type="text" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
          </Grid>
        </Grid>      
        <Button type="submit" disabled={!updated} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Update</Button>
      </Box>
    </Container>
  )
}
