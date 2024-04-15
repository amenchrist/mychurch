import React from 'react'
import FullWidthTabs from '../../components/WatchPage/FullWidthTabs'
import VideoPlayer from '../../components/WatchPage/VideoPlayer'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AttendancePage from './AttendancePage';
import { useStateContext } from '../../contexts/ContextProvider';
import WatchPageSidebar from '../../components/WatchPage/WatchPageSidebar';
import { Hidden } from '@mui/material';
import { useMyStore } from '../../store';
import Schedule from '../../components/Schedule';
import date from 'date-and-time';


function WatchPage() {

  const { user, isMobileNavOpen, setMobileNavOpen } = useStateContext();
  const { event, nextEvent } = useMyStore();

  console.log(nextEvent)


  const ServiceMessage = () => {
    return (
      <div style={{color: 'white', width: "100%", textAlign: 'center', padding: '20px'}}>
      <p>NEXT EVENT</p>
      <h3>{nextEvent.name}.toUpperCase()</h3>
      <p>{`${date.format(new Date(nextEvent.date), 'dddd, MMMM DD')} @ ${nextEvent.time}`}</p>
      </div>
    )
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        {/* <WatchPageSidebar 
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        /> */}
        <Hidden mdDown>
        <Grid container sx={{ height: "100%" }} >
          <Grid item xs={12} md={8}  >  
            <div style={{backgroundColor: "black", display:"flex", width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
              <div style={{ width: '100%'}}>
                {event === null ? <ServiceMessage /> : <VideoPlayer event={event} />}
                {/* <ServiceMessage /> */}
              </div>
            </div>     
          </Grid>
          <Grid item xs={12} md={4} style={{display: 'flex', width: "100%", flexDirection: 'column',  alignItems: 'center'}} >
            {/* {user.attendanceSubmitted? <FullWidthTabs /> : <AttendancePage /> } */}
            {user.attendanceSubmitted? <FullWidthTabs /> : <Schedule /> }
          </Grid>
        </Grid>
        </Hidden>
        <Hidden mdUp>
        <div style={{display: 'flex', height: "100%", width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div id={'video-container'} style={{ backgroundColor: "black",  width: '100%'}}>
            <VideoPlayer />
            {/* <ServiceMessage /> */}
          </div>
          <div id='attendance-div' style={{ flexGrow: 1, overflowY: "hidden", margin: 0, width: "100%",display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {user.attendanceSubmitted? <FullWidthTabs /> : <AttendancePage /> }
          </div>
        </div>
        </Hidden>
      </Box>
    </>
  )
}

export default WatchPage