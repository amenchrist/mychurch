import React from 'react';
import { useState } from "react";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRegistrationPageContext } from '../../../contexts/RegistrationContextProvider';

export default function BiodataForm({setStage}) {
  
  const [ error, setError ] = useState(false);
  const { setBioData, bioData } = useRegistrationPageContext();

  //New User Profile States
  const [ title, setTitle ] = useState(bioData.title);
  const [ firstName, setFirstName ] = useState(bioData.firstName);
  const [ lastName, setLastName ] = useState(bioData.lastName);
  const [ disabled, setDisabled ] = useState(true);

  const [ gender, setGender ] = useState(bioData.gender);
  const [ dateOfBirth, setDateOfBirth ] = useState(bioData.dateOfBirth || '00/00/0000/');
  const [ maritalStatus, setMaritalStatus ] = useState(bioData.maritalStatus);
  const [ nationality, setNationality ] = useState(bioData.nationality);

  const handleSubmit = e => {
    e.preventDefault();
    setBioData({ title, firstName, lastName, gender, dateOfBirth, maritalStatus, nationality });
    setStage(3);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt:2, p:2, overflowY: 'auto'}} onFocus={() => setError(false)} >
      <Grid container spacing={2}>
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <Typography>Biodata</Typography>
          </Grid>
          <Grid item>
            <Typography onClick={() => setStage(1)} >{'<--'}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField autoFocus required fullWidth autoComplete="given-name" label="First Name" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth autoComplete="family-name" label="Last Name" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField required select fullWidth id="gender" label="Gender" name="gender" value={gender} autoComplete="title" autoFocus onChange={(e) => setGender(e.target.value)} >
            {['Male', 'Female'].map((c, i) => (<MenuItem key={i} value={c}>{c}</MenuItem>))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Date of Birth" type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField required select fullWidth id="maritalStatus" label="Marital Status" name="gender" value={maritalStatus} autoComplete="maritalStatus" autoFocus onChange={(e) => setMaritalStatus(e.target.value)} >
            {['Single', 'Married', 'Divorced'].map((c, i) => (<MenuItem key={i} value={c}>{c}</MenuItem>))}
          </TextField>
          {/* <TextField fullWidth label="Marital Status" type="text" id="maritalStatus" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} /> */}
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Nationality" type="text" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Continue</Button>
    </Box>
  );
}
