import { auth, db } from "../config/firebase";
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from "react";
import { useMyStore } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { emailRegex } from "../regex";


export const EmailSignInForm = ({setUsePassword}) => {

  const { setIsSignedIn, setUser } = useMyStore();

  const [ email, setEmail ] = useState(window.localStorage.getItem("emailForSignIn") || ""); // Will try to use previously entered email, defaults to an empty string
  const [ isRegistered, setIsRegistered ] = useState(false);
  const [ valid, setValid ] = useState(false);

  const handleValidation = (value) => {
    // setIsRegistered(true)
    //set email to user input
    setEmail(value.toLowerCase());

    //define regex     
    const reg = new RegExp(emailRegex); 
      
    //test whether input is valid
    setValid(reg.test(value));

  };  

  const checkEmail = () => {
    if( !valid && email =='' ) return
    (async () => {
      try {
        const docRef = doc(db, 'userProfiles', email)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          console.log("Email exists");
          setIsRegistered(true)
        } else {
          setIsRegistered(false)
        }
      } catch (err) {
        console.log("Error validating email");
        console.log(err)
      }
    })()
  }

  //PASSWORDLESS SIGN IN
  const [errorResponse, setErrorResponse] = useState("");

  const trySignIn = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:3000/',
      // This must be true.
      handleCodeInApp: true,
    };

    // If the user is re-entering their email address but already has a code
    if (isSignInWithEmailLink(auth, window.location.href) && !!email) {
      // Sign the user in
      signInWithEmailLink(auth, email, window.location.href)
      .then(res => {
        window.localStorage.removeItem('emailForSignIn');
        setIsSignedIn(true);
        setUser({...{}, email: res.user.email});
      })
      .catch((err) => {
        console.log(err)
      });
    } else {
      sendSignInLinkToEmail( auth, email, actionCodeSettings)
      .then((res) => {
        console.log(res)
        // Save the users email to verify it after they access their email
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  };

  // When this component renders // USED AFTER EMAIL REDIRECTION
  useEffect(() => {
    // Get the saved email
    const saved_email = window.localStorage.getItem("emailForSignIn");

    // Verify the user went through an email link and the saved email is not null
    if (isSignInWithEmailLink(auth, window.location.href) && !!saved_email) {
      // Sign the user in
      signInWithEmailLink(auth, saved_email, window.location.href)
      .then(res => {
        console.log(res);
        setIsSignedIn(true);
        setUser({...{}, email: res.user.email});
      })        
      .catch ((err) => {
        console.log(err)
      });
    } 
  }, []);
  

  return (
    <>
      <Box component="form" onSubmit={trySignIn} sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => handleValidation(e.target.value)}
          onBlur={checkEmail}
          error={!valid}
        />
        
        { !isRegistered && email !== ''? 
        <Typography component="h5" variant="p" sx={{ textAlign: 'center',  color: 'red' }}>
        Email not found
        </Typography> : <></>}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isRegistered} >
          Sign in with Email Link
        </Button>
        <Grid container>
          <Grid item xs>
          </Grid>        
          <Grid item>
            <Link href="/register" variant="body2">
              {"Create account"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => setUsePassword(true)}
      >
        Sign In with Password
      </Button>
    </>
  );
};