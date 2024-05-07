import React, { useState } from 'react'
import FullWidthTabs from '../../components/WatchPage/FullWidthTabs'
import VideoPlayer from '../../components/WatchPage/VideoPlayer'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useStateContext } from '../../contexts/ContextProvider';
import WatchPageSidebar from '../../components/WatchPage/WatchPageSidebar';
import { Hidden } from '@mui/material';
import { useMyStore } from '../../store';
import Schedule from '../../components/Schedule';
import dayjs from 'dayjs';
import AttendanceCard from '../../components/WatchPage/AttendanceCard';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import Navbar from '../../components/WatchPage/NavBar';
import Vimeo from '@vimeo/player';


function WatchPage() {

  const { user, isMobileNavOpen, setMobileNavOpen } = useStateContext();
  
  const { event, nextEvent, currentPage } = useMyStore();
  const { attendanceCaptured } = useWatchPageContext();


  const ServiceMessage = () => {
    return (
      <div style={{color: 'white', width: "100%", height: '30vh',textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        {nextEvent ? <><p>NEXT EVENT</p>
        <h3>{nextEvent?.name.toUpperCase()}</h3>
        <p>{dayjs(nextEvent?.date).format('dddd, MMMM DD @ hh:mm a')}</p></> : <p>NO UPCOMING EVENTS</p>}
      </div>
    )
  }

  const VimeoPlayer = () => {
    const options = {
      id: 59777392,
      width: 640,
      loop: true
    };

    const player = new Vimeo.Player('made-in-ny', options);

    player.setVolume(0);

    player.on('play', function() {
        console.log('played the video!');
    });
    return (
        // <iframe title='vimeo-player' src="https://vimeo.com/event/3920479/embed"
        // frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" 
        // allowFullScreen style={{width:'100%',height:'100%', border: '2px solid red'}}></iframe>
      // <div style={{padding:"0 0 0 0", position:'relative', width:'100%', height: '100%', border: '2px solid red', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
      //   </div>
      // <iframe title='vimeo-player' src="https://player.vimeo.com/video/938788848?h=bb3f3cdeea&title=0&byline=0&portrait=0" 
      // width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
      <>
      <div id="made-in-ny"></div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </>
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
                {/* { event?.hasStarted ? attendanceCaptured ?<VideoPlayer event={event} /> : <AttendanceCard /> : <ServiceMessage /> } */}
            </div>     
          </Grid>
          <Grid item xs={12} md={4} style={{display: 'flex', width: "100%", flexDirection: 'column',  alignItems: 'center'}} >
            {user.attendanceSubmitted? <FullWidthTabs /> : <Schedule /> }
          </Grid>
        </Grid>

        {/* FOR MOBILE DEVICES */}
        
        {/* <div style={{display: 'flex', height: "100%", width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div id={'video-container'} style={{ backgroundColor: "black", width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 0px'}}>
            { event?.hasStarted ? attendanceCaptured ? <VideoPlayer event={event} /> : <AttendanceCard /> : <ServiceMessage /> }
          </div>
          <div id='attendance-div' style={{ flexGrow: 1, overflowY: "hidden", margin: 0, width: "100%",display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {user.attendanceSubmitted? <FullWidthTabs /> : <Schedule /> }
          </div>
        </div> */}
        <Hidden mdUp>
        </Hidden>
      </Box>
    </>
  )
}

export default WatchPage