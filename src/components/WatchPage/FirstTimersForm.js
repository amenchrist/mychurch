import React, { useEffect, useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, MenuItem, Typography  } from '@mui/material';
import { nameRegex, phoneRegex } from '../../regex';
import { v4 as uuidv4 } from 'uuid';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import { churches, handleValidation, titles } from './formAssets';
// import { Address, Biodata, ContactInfo } from '../../classes';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { MuiTelInput } from 'mui-tel-input';
import Biodata from '../../classes/Biodata';
import ContactInfo from '../../classes/ContactInfo';

export default function FirstTimersForm() {
  
  const { attendeeEmail, setIsRegistered, setEmailCaptured } = useWatchPageContext();

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ church, setChurch ] = useState('CE BARKING');
  const [ allowsMarketing, setAllowsMarketing ] = useState(true)
    
  const [ validFirstName, setValidFirstName ] = useState(false);
  const [ validLastName, setValidLastName ] = useState(false);
  const [ validPhone, setValidPhone ] = useState(false);

  const [ valid, setValid ] = useState(false);

  useEffect(() => {
    console.log("Valid = ", valid)
    if(validFirstName && validLastName && validPhone ){
      setValid(true)
    } else {
      setValid(false)
    }
  }, [validFirstName, validLastName, validPhone, valid ])

  const handleSubmit = async (event) => {

    event.preventDefault();
    const bioData = new Biodata({ title, firstName, lastName })
    const contactInfo = new ContactInfo({ email: attendeeEmail, phoneNumber: phone, })

    const newUser = {
      id: `user_${uuidv4()}`,
      bioData: {...bioData},
      contactInfo: {...contactInfo},
      church, allowsMarketing,
      type: 'USER'
    }

    console.log(newUser)

    try {
      await setDoc(doc(db, 'userProfiles', attendeeEmail), newUser);
      console.log('New User Profile Added')
      setEmailCaptured(true);
      setIsRegistered(true);
    } catch (err) {
      console.log('Error adding user profile')
      console.log(err);
    }
  };



  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, height: '200px', overflowY:'auto'}} >
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant='p' onClick={() => setIsRegistered(true)} >Back</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={attendeeEmail}
            disabled
          />
        </Grid>
        <Grid item xs={12} >
          <TextField required select fullWidth id="title" label="Title" name="title" value={title} autoComplete="title" autoFocus onChange={(e) => setTitle(e.target.value)} >
            {titles.map((title) => (<MenuItem key={title.value} value={title.value}>{title.label}</MenuItem>))}
          </TextField>
        </Grid>
        <Grid item xs={12} >
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            error={!validFirstName}
            value={firstName}
            onChange={(e) => handleValidation(e.target.value, setFirstName, setValidFirstName, nameRegex)}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            autoComplete="family-name"
            name="lastName"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            error={!validLastName}
            value={lastName}
            onChange={(e) => handleValidation(e.target.value, setLastName, setValidLastName, nameRegex)}
          />
        </Grid>            
        {/* <Grid item xs={12}>
          <TextField required fullWidth id="phone" label="Phone Number" name="phone" autoComplete="phone" error={!validPhone}
            value={phone}
            onChange={(e) => handleValidation(e.target.value, setPhone, setValidPhone, phoneRegex)}
          />
        </Grid> */}
        <Grid item xs={12}>
          <MuiTelInput label="Phone Number" fullWidth value={phone} onChange={(e) => {setValidPhone(true); setPhone(e) }} />
        </Grid>
        {/* <Grid item xs={12} >
          <TextField required select fullWidth id="title" label="Select Your Church" name="church" value={church} autoComplete="church" onChange={(e) => setChurch(e.target.value)} >
            {churches.map((church) => (<MenuItem key={church} value={church}>{church}</MenuItem>))}
          </TextField>
        </Grid> */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={allowsMarketing} onChange={() => { setAllowsMarketing(!allowsMarketing)}} color="primary" />}
            label="I want to receive inspiration, and updates via email."
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={!valid}
      >
        Submit
      </Button>
    </Box>
  )
}
