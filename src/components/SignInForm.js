import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from "react";
import { useMyStore } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { emailRegex } from "../regex";


export const SignInForm = ({setUsePassword}) => {

  const setUser = useMyStore((store) => store.setUser)
  const { setIsSignedIn } = useMyStore();

  const [email, setEmail] = useState(window.localStorage.getItem("emailForSignIn") || "");
  const [password, setPassword] = useState("");
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

  const signIn = async (e) => {
    e.preventDefault();

    const getUser = async (userCred) => {

      try {
        const docRef = doc(db, 'userProfiles', userCred.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          setUser({...userCred, ...docSnap.data()});
        } else {
          console.log('User Profile not found');
          setIsRegistered(false)
        }
      } catch (err) {
        console.log(err);
      }
    }

    if(!isRegistered){
      try {
        const docRef = doc(db, 'userProfiles', email)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          setIsRegistered(true)
          return
        } 
      } catch (err) {
        console.log("Error fetching doc");
        console.log(err)
        setIsRegistered(false);
        return
      }
    } else {
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        getUser(userCred.user)
        
      } catch (err) {
        console.error(err);
      }
    }
  };

  

  const checkEmail = () => {
    if(!valid && email !=='' ) return
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
  return (
    <>
      <Box component="form" onSubmit={signIn} sx={{ mt: 1, width: '100%' }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isRegistered}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2">
                  Forgot password?
              </Link>
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
        onClick={() => setUsePassword(false)}
      >
        Sign In with Email Link
      </Button>
    </>
  );
};