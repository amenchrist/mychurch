import React from 'react';
import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRegistrationPageContext } from '../../../contexts/RegistrationContextProvider';

export default function BiodataForm({setStage}) {
  
  const [ error, setError ] = useState(false);
  const { setBioData } = useRegistrationPageContext();

  //New User Profile States
  const [ title, setTitle ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ role, setRole ] = useState("SUBSCRIBER");
  const [ disabled, setDisabled ] = useState(true);

  const [ middleName, setMiddleName ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ dateOfBirth, setDateOfBirth ] = useState('');
  const [ maritalStatus, setMaritalStatus ] = useState('');
  const [ nationality, setNationality ] = useState('');

  const bioData = { title, firstName, middleName, lastName, gender, dateOfBirth, maritalStatus, nationality }

  const handleSubmit = e => {
    e.preventDefault();
    setBioData(bioData);
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
          <TextField required fullWidth disabled name="Role" label="Role" type="text" id="Role" value={role} onChange={(e) => setRole(e.target.value)} />
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Continue</Button>
    </Box>
  );
}
