import React, { useEffect }  from 'react';
import { Avatar, Link, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useStateContext } from '../../contexts/ContextProvider';
import EmailForm from '../../components/WatchPage/EmailForm';
import AttendanceForm from '../../components/WatchPage/AttendanceForm';
import FirstTimersForm from '../../components/WatchPage/FirstTimersForm';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Powered by '}
      <Link color="inherit" href="#">
        Evangel
      </Link>{' '}
      {/* {new Date().getFullYear()} */}
      {'.'}
    </Typography>
  );
}
export default function AttendancePage() {

  const [ height, setHeight ] = React.useState('90%');
  const { user } = useStateContext();

  useEffect(() => {
    if(window.innerWidth > 900){
      setHeight('80%');
    }
  }, [])  

  
  return (
      <Container component="main" maxWidth="xs"
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: "space-between", 
          height: '100%',
          width: '100%',
          pb:2, m:0,
          overflowY: "auto",
          alignItems: 'center'
        }} 
        >
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: height,
            width: '100%',
            justifyContent: "center",          
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Welcome
          </Typography>
          <Typography component="h5" variant="p">
            Please sign in to unmute.
          </Typography>
          <div style={{ overflowY: "auto", width: '100%' }}>
            {!user.emailChecked? <EmailForm /> : user.isRegistered? <AttendanceForm isAnAdmin={user.isAnAdmin} /> : <FirstTimersForm /> }
          </div>
        </Box>
        <Copyright />
      </Container>
  );
}