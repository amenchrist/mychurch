import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from "react";
import { useMyStore } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { emailRegex } from "../regex";


export const EmailSignInForm = () => {

  const { setIsSignedIn, setUser } = useMyStore();

  const [ email, setEmail ] = useState(window.localStorage.getItem("emailForSignIn") || "");
  const [ isRegistered, setIsRegistered ] = useState(false);
  const [ valid, setValid ] = useState(true);

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

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Evangel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  //PASSWORDLESS SIGN IN

    // Will try to use previously entered email, defaults to an empty string
    // const [email, setEmail] = React.useState(
    //   window.localStorage.getItem("emailForSignIn") || ""
    // );
    const [errorResponse, setErrorResponse] = useState("");
  
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
  
    // const clearError = () => {
    //   if (errorResponse !== "") {
    //     setErrorResponse("");
    //   }
    // };
  
    // const updateEmail = (e) => {
    //   clearError();
    //   setEmail(e.target.value);
    // };
  
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
  

  

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
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
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isRegistered}
            >
              Sign In with Email
            </Button>
            <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Create account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {/* <Box component="form" noValidate onSubmit={signIn} sx={{ mt: 3, width: '100%' }}  >
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              error={false}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        {!isRegistered? <Typography component="h5" variant="p" sx={{ mt: 2,  textAlign: 'center', color: 'red' }}>
            Email not found
        </Typography> : <></> }
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          disabled={false}
        >
          Log in
        </Button>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt:1, mb: 2 }}
      >
        I'm New Here
      </Button> */}
    {/* <div style={{width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}> Sign In</button>
      <br />
      <a href='/signup'>I'm new here</a>
    </div> */}
    </>
  );
};