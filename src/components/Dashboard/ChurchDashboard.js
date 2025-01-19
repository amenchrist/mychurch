import React, { useEffect, useState } from 'react';
import { Box, Card, Container, Grid, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useMyStore } from '../../store';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import EventReport from './EventReport';
import EventsList from './EventsList';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import PostContainer from '../PostContainer';
import BottomNav from '../BottomNav';
import Follower from '../../classes/Follower';


export default function ChurchDashboard() {

  const { currentPage, user, setFollower, follower } = useMyStore();
  const { showEventReport, setEvents, setShowEventReport, events } = useDashboardContext();

  const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD'));
  const [ eventsFound, setEventsFound ] = useState(false);

  const [ dateRequested, setDateRequested ] = useState(false)

  const [ isFollowing, setIsFollowing ] = useState(follower?.userID ? true : false )

  const submitDate = (e) => {
    setDate(e.target.value);
    setShowEventReport(false);
    setDateRequested(true);
  }
  

  useEffect(() => {
    const getEvents = async () => {
      // console.log('searching for all events')
      try {
        const events = await currentPage.getEvents()
        if(events){
          const relevantEvents = events.filter((e)=> e.hasStarted).sort((e1,e2) => dayjs(e2.date) - dayjs(e1.date));
          setEventsFound(relevantEvents.length > 0)
          setEvents(relevantEvents)
        }
      }catch (err) {
        console.log("Error getting Events in Dashboard")
        console.log(err)
      } 
    }
    getEvents()
  }, [currentPage, setEvents,])

  useEffect(() => {
    const getEventsByDate = async () => {
      console.log('searching for new date')
      try {
        const events = await currentPage.getEventsByDate(date)
        if(events){
          // const relevantEvents = events.filter((e)=> e.hasStarted)
          setEventsFound(events.length > 0)
          setEvents(events)
        }
      }catch (err) {
        console.log("Error getting Events by date")
        console.log(err)
      } 

    }

    if(dateRequested){
      getEventsByDate();
      setDateRequested(false)
    } 
  }, [date, currentPage, setEvents, dateRequested])


  useEffect(() => {
    console.log('Checking if user is a follower')
    const checkIfFollower = async () => {
      try {
        const userFollows = await currentPage.userFollows(user)
        if(userFollows){
          console.log('User is a follower')
          if(follower?.userID !== userFollows?.userID){

            setFollower(userFollows)
          }
        }
      }catch (err) {
        console.log("Error getting Follower status")
        console.log(err)
      } 
    }

    checkIfFollower()

  }, [ currentPage, setFollower, user, follower?.userID])


  function oldReturn() {
    const style = {
      width: '300px',
      height: '30vh',
      border: '2px solid'
    }
    return(
      <>
      {/* {adminMode? <AdminDashboard /> : <MemberDashboard />} */}
      <Container component="main" maxWidth="800px" sx={{maxWidth: '800px', width: '80vw',}}>
        <Box sx={{ marginTop: 8, height:'80%',  }} >
          <Typography component="h1" variant="h4">Analytics</Typography>
          <Box component="form" sx={{ mt: 2,  height:'100%', overflowY: 'auto', paddingTop:1}}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography component="p" sx={{ mb: 2,}} >Select an event date</Typography>
              <TextField required type="date" label="Date" value={date} onChange={submitDate} />
            </Grid>
          </Grid>
          {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Save</Button> */}
          {eventsFound? <></> : <Typography component="p" sx={{ mt: 2,}} >No events to report.</Typography>}
          </Box>
        </Box>

        <Box sx={{ height:'80%',  }} >
          { showEventReport ? <EventReport /> : eventsFound? <EventsList /> 
          : <div style={{width: '600px', height: '300px', border: '2px solid', marginTop: 15}}>
            <p>Graph of attendance figures for the year till date</p>
          </div> 
          }
        </Box>
      </Container>
      </>
    )
  }

  const followPage = async (e) => {
    e?.preventDefault();
    const newFollower = new Follower({userID: user.id,})

    try {
      const followerAdded = await currentPage?.addFollower(newFollower)
      if(followerAdded){
        setFollower(newFollower)
      }
    } catch (err) {
      console.log('Error updating event')
      console.log(err);
    }
  }

  return (
    <>
      <div style={{height: '95vh', overflowY: 'auto'}}>
      <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="Jesus.jpg"
        title="Cover photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {currentPage?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {currentPage?.bio || 'No bio yet'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Visit Website</Button>
      </CardActions>
      { isFollowing ? <></> : <CardActions><Button size="small" onClick={followPage}>Follow</Button></CardActions>}
      <div style={{ overflowY: 'auto',  width: '100%', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
      {events.map((e, i) => <PostContainer key={i} post={e}/>)}
      </div>
    </Card>
        
      </div>
      <div style={{height: '5vh', width: '100%', border: '2px solid', display: 'flex', justifyContent: 'center'}}>
        <BottomNav />
      </div>
    </>
  )

}