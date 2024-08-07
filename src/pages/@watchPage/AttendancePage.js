import React, { useEffect }  from 'react';
import { Avatar, Link, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmailForm from '../../components/WatchPage/OldEmailForm';
import AttendanceForm from '../../components/WatchPage/OldAttendanceForm';
import FirstTimersForm from '../../components/WatchPage/FirstTimersForm';
import { useMyStore } from '../../store';


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
  const { user, setUser } = useMyStore();

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
          {user? <Avatar sx={{ mb: 1, alignSelf:'flex-start'}} onClick={() => setUser(null)} ><RefreshIcon /></Avatar> : <></>}
          
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Welcome
          </Typography>
          <Typography component="h5" variant="p">
            Please sign in to unmute.
          </Typography>
          <div style={{ overflowY: "auto", width: '100%', }}>
            {!user? <EmailForm /> : user.isRegistered? <AttendanceForm isAnAdmin={user.isAnAdmin} /> : <FirstTimersForm /> }
          </div>
        </Box>
        <Copyright />
      </Container>
  );
}