import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../config/firebase';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import { ContactPage } from '@mui/icons-material';

function AccessCodeForm() {

  const [ accessCode, setAccessCode ] = React.useState('');
  const [ valid, setValid ] = React.useState(true);
  const { setAccessCodeIsValid } = useWatchPageContext();
  const [ showMessage, setShowMessage ] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // checkAccessCode()
    if(!valid) return;
    (async () => {
      try {
        const docRef = doc(db, 'accessCodes', 'cebarking');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().code === accessCode){ 
          setAccessCodeIsValid(true)
        } else {
          console.log("No such document or access code does not match!");
          setValid(false)
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
          SUBMIT
        </Button>
        <Typography component="h5" variant="p" sx={{ mt: 2,  textAlign: 'center', color: 'gray'}} onClick={() => setShowMessage(true)} >
            Get Access Code
        </Typography>
        {showMessage && (
          <Typography component="p" variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'gray'}}>
            Please contact your cell leader for assistance.
          </Typography>
        )}
      </Box>
    </>
  )
}

export default AccessCodeForm