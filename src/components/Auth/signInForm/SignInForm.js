import { auth, db } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useMyStore } from "../../../store";
import { doc, getDoc } from "firebase/firestore";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { emailRegex } from "../../../regex";
import { useNavigate } from "react-router-dom";
import User from "../../../classes/User";
import { getUser } from "../../../dbQueryFunctions";


export const SignInForm = ({setUsePassword}) => {

  const setUser = useMyStore((store) => store.setUser)
  const { setIsSignedIn } = useMyStore();
  const navigate = useNavigate();

  const [ email, setEmail ] = useState(window.localStorage.getItem("emailForSignIn") || "");
  const [ password, setPassword ] = useState("");
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
    //Submit will only be enabled if email is registered
    e.preventDefault();
    //Sign in flow
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await getUser(email)
      if(user){
        setUser(user)
        setIsSignedIn(true);
        navigate(`/${user.primaryPage}`);
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  const checkEmail = () => {
    // console.log('checking if email is registered')
    if(!valid && email !=='' ) return
    (async () => {
      try {
        const docRef = doc(db, 'userProfiles', email)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          // console.log("Email exists");
          setIsRegistered(true)
        } else {
          setIsRegistered(false)
        }
      } catch (err) {
        console.log("Error validating email");
        // console.log(err)
      }
    })()
  }

  // checkEmail() 


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