import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from "../components/Copyright";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AccountInfo from "../components/Auth/Registration/AccountInfo";
import BiodataForm from "../components/Auth/Registration/BiodataForm";
import ContactInfoForm from "../components/Auth/Registration/ContactInfoForm";
import {  useRegistrationPageContext } from "../contexts/RegistrationContextProvider";

export const SignUpPage = () => {

  const { stage, setStage } = useRegistrationPageContext();

  const Notice = ({type, message}) => {
    return (
    <Alert severity={type}>
      <AlertTitle>{type.toUpperCase()}</AlertTitle>
      {message}
    </Alert>)
  }

  const Form = () => {
    switch (stage){
      case 2:
        return(<BiodataForm setStage={setStage} />)
      case 3:
        return(<ContactInfoForm setStage={setStage} />)
      default: //1
        return(<AccountInfo setStage={setStage} />)
    }
  }

  return (
    
      <Container component="main" maxWidth="xs" sx={{}}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%', }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>
          {/* {true? <Notice type='error' message={'Something went wrong'} /> : <></>} */}
          <Form />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}

