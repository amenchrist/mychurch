import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../config/firebase';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';

function AccessCodeForm() {

  const [ accessCode, setAccessCode ] = React.useState('');
  const [ valid, setValid ] = React.useState(true);

  const { setAccessCodeIsValid } = useWatchPageContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // checkAccessCode()

    if(accessCodeIsValid()){
      console.log("Access code is valid")
      setAccessCodeIsValid(true);
    } else {
      console.log("Access code is invalid")
      setValid(false)
    }
  }

  const accessCodeIsValid = () => {
    //verify access code
    (async () => {
      try {
        const docRef = doc(db, 'accessCodes', 'cebarking');
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        if (docSnap.exists() && docSnap.data().code === accessCode){ 
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log("Error validating access code");
        console.log(err)
      }
    })()
  }

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}  >
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <TextField required fullWidth id="accessCode" label="Access Code" name="accessCode" autoComplete="accessCode" value={accessCode} error={!valid} autoFocus
              onChange={(e) => {setAccessCode(e.target.value); setValid(true);}} />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Join Meeting
        </Button>
      </Box>
    </>
  )
}

export default AccessCodeForm