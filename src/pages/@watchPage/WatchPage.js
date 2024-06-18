import React from 'react'
import FullWidthTabs from '../../components/WatchPage/FullWidthTabs'
import VideoPlayer from '../../components/WatchPage/VideoPlayer'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useStateContext } from '../../contexts/ContextProvider';
import WatchPageSidebar from '../../components/WatchPage/WatchPageSidebar';
import { useMyStore } from '../../store';
import Schedule from '../../components/Schedule';
import dayjs from 'dayjs';
import AttendanceCard from '../../components/WatchPage/AttendanceCard';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import Navbar from '../../components/WatchPage/NavBar';
import VimeoPlayer from '../../components/WatchPage/VimeoPlayer';


function WatchPage() {

  const { user, isMobileNavOpen, setMobileNavOpen } = useStateContext();
  
  const { event, nextEvent, currentPage } = useMyStore();
  const { attendanceCaptured } = useWatchPageContext();



  const ServiceMessage = () => {
    return (
      <div style={{color: 'white', width: "100%", height: '30vh',textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        {nextEvent ? <><p>NEXT EVENT</p>
        <h3>{nextEvent?.name.toUpperCase()}</h3>
        <p>{dayjs(`${nextEvent?.date} ${nextEvent?.time}`).format('dddd, MMMM DD @ hh:mm a')}</p></> : <p>NO UPCOMING EVENTS</p>}
      </div>
    )
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <Navbar />
        <WatchPageSidebar 
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        />
        <Grid container sx={{ height: "100%" }} >
          <Grid item xs={12} md={8}  >  
            <div style={{backgroundColor: "black", display:"flex", width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                { event?.hasStarted ? attendanceCaptured ? currentPage.liveStreamURL.includes('vimeo')? <VimeoPlayer />:<VideoPlayer event={event} /> : <AttendanceCard /> : <ServiceMessage /> }
            </div>     
          </Grid>
          <Grid item xs={12} md={4} style={{display: 'flex', width: "100%", flexDirection: 'column',  alignItems: 'center'}} >
            {user.attendanceSubmitted? <FullWidthTabs /> : <Schedule /> }
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default WatchPage