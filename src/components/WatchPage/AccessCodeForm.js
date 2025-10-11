import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../config/firebase';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import { ContactPage } from '@mui/icons-material';


  function useAccessCode() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const updateAccessCode = async (newCode, docId = 'cebarking') => {
      setLoading(true);
      setError(null);
      try {
        // const { setDoc } = await import('firebase/firestore');
        const docRef = doc(db, 'accessCodes', docId);
        // setDoc with merge ensures the document is created if missing and only updates the "code" field
        await setDoc(docRef, { code: newCode }, { merge: true });
        setLoading(false);
        return true;
      } catch (err) {
        setError(err);
        setLoading(false);
        return false;
      }
    };

    return { updateAccessCode, loading, error };
  }
  


function AccessCodeForm() {

  const [ accessCode, setAccessCode ] = React.useState('');
  const [ valid, setValid ] = React.useState(true);
  const { setAccessCodeIsValid } = useWatchPageContext();
  const [ showMessage, setShowMessage ] = React.useState(false);

  const updateAccessCode = async (newCode, docId = 'cebarking') => {
   
    try {
      // const { setDoc } = await import('firebase/firestore');
      const docRef = doc(db, 'accessCodes', docId);
      // setDoc with merge ensures the document is created if missing and only updates the "code" field
      await setDoc(docRef, { code: newCode }, { merge: true });
      // setLoading(false);
      return true;
    } catch (err) {
      // setError(err);
      // setLoading(false);
      return false;
    }
  };

  // const done = updateAccessCode('CHAZAR');

  // React.useEffect(() => {
  //   console.log('Access code updated:', done);
  // }, [done]);

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