import React, { useState } from 'react'
import { SignInForm } from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';
import { Avatar, Box, Container, CssBaseline, Link, Typography } from '@mui/material';
import { EmailSignInForm } from '../components/EmailSignInForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


export default function SignInPage() {

    const [ isRegistered, setIsRegistered ] = useState(true);
    const [ usePassword, setUsePassword ] = useState(true);
    

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
          {usePassword? <SignInForm setUsePassword={setUsePassword} /> : <EmailSignInForm setUsePassword={setUsePassword}/>}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      
    </>
  )
}
