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
import FacebookPlayer from '../../components/WatchPage/FacebookPlayer';
import Event from '../../classes/Event';
import EventCard from '../../components/EventCard';
import BottomNav from '../../components/BottomNav';
import { Hidden, Typography } from '@mui/material';


function WatchPage() {

  const { user, isMobileNavOpen, setMobileNavOpen } = useStateContext();
  
  const {  currentPage,  } = useMyStore();
  const nextEvent = useMyStore(store => new Event(store.nextEvent))
  const event = useMyStore(store => new Event(store.event))
  const { attendanceCaptured, events, pastEvents, } = useWatchPageContext();

  const ServiceMessage = () => {
    return (
      <div style={{color: 'white', width: "100%", height: '30vh',textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        {nextEvent.id ? <><p>NEXT EVENT</p>
        <h3>{nextEvent?.name.toUpperCase()}</h3>
        <p>{dayjs(nextEvent?.getTimestamp()).format('dddd, MMMM DD @ hh:mm a')}</p></> : <p>NO UPCOMING EVENTS</p>}
      </div>
    )
  }

  const PastEvents = () => {
    return (
      <Grid sx={{width: '100%', borderTop: '2px solid',  height: '50%', p:1}}>
        <Typography variant='h6'>Past Events</Typography>

        {pastEvents.map((a,i) => <EventCard event={a} key={i} /> )}
      </Grid>
    )
  }

  const UpcomingEvents = () => {

  }

  const MobileWatchPage = () => {
    return (
      <Grid container sx={{ height: "90vh", display: { xs: 'flex', md: 'none', lg: 'none' }, alignContent: 'space-between', }} >
        <Grid item xs={12} sx={{height: '40%', }} >  
          <div style={{backgroundColor: "black", display:"flex", width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* { event?.hasEnded && event?.archiveURL ? <VimeoPlayer /> : */}
              {event?.hasStarted ? attendanceCaptured ? 
              currentPage.liveStreamURL.includes('vimeo')? <VimeoPlayer />: currentPage.liveStreamURL.includes('facebook')? <FacebookPlayer link={currentPage.liveStreamURL} />: 
              <VideoPlayer event={event} /> : <AttendanceCard /> : <ServiceMessage /> }
          </div>     
        </Grid>
        <Grid sx={{width: '100%', height: '10%', p:1, borderBottom: '2px solid' }}>
          <Typography variant='h6'>{event?.name || 'No Upcoming Event'}</Typography>
          <Typography variant='p'>{event?.formattedDate() || ''}</Typography>
        </Grid>
        <Grid item xs={12} sx={{display: 'flex', width: "100%", height: '40%', flexDirection: 'column',  justifyContent: 'space-between', alignItems: 'center', overflowY: 'auto'} } >
          {user.attendanceSubmitted? <FullWidthTabs /> : <Schedule /> }
          <PastEvents />
        </Grid>
        <BottomNav showOnLg={false}/> 
      </Grid>
    )
  }

  const NonMobileWatchPage = () => {
    return (
      <Grid container sx={{ height: "90vh", display: { xs: 'none', md: 'flex', lg: 'flex' }, }} >
        <Grid item md={8} sx={{ height: "100%",}} >  
          <div style={{backgroundColor: "black", display:"flex", width: '100%', height: '90%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* { event?.hasEnded && event?.archiveURL ? <VimeoPlayer /> : */}
              {event?.hasStarted ? attendanceCaptured ? 
              currentPage.liveStreamURL.includes('vimeo')? <VimeoPlayer />: currentPage.liveStreamURL.includes('facebook')? <FacebookPlayer link={currentPage.liveStreamURL} />: 
              <VideoPlayer event={event} /> : <AttendanceCard /> : <ServiceMessage /> }
          </div> 
          <Grid sx={{width: '100%', height: '10%', p:1, borderBottom: '2px solid' }}>
            <Typography variant='h6'>{event?.name || 'No Upcoming Event'}</Typography>
            <Typography variant='p'>{event?.formattedDate() || ''}</Typography>
          </Grid>    
        </Grid>
        <Grid item md={4} style={{display: 'flex', width: "100%",  height: '100%', flexDirection: 'column',  justifyContent: 'space-between', alignItems: 'center' , overflowY: 'auto'} } >
          {user.attendanceSubmitted? <FullWidthTabs /> : <Schedule /> }
          <PastEvents />
          {/* <BottomNav showOnLg={false}/>  */}
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        <Navbar openSideBar={setMobileNavOpen} /> 
        <WatchPageSidebar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
        <MobileWatchPage />
        <NonMobileWatchPage />
      </Box>
    </>
  )
}

export default WatchPage