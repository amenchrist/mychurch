import React, { useEffect, useState } from 'react'
import { useMyStore } from '../store';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import EventForm from '../components/EventForm';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Events() {

  const { currentPage, setEvent } = useMyStore();
  const [ newEvent, setNewEvent ] = useState(false);
  const [ events, setEvents ] = useState([])

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  
  useEffect(() => {

    const getEvents = async () => {
      const q = query(collection(db, "events"), where("parentPageID", "==", currentPage.id));      


      const querySnapshot = await getDocs(q); 
      const newEvents = []

      querySnapshot.forEach((doc) => {
        newEvents.push(doc.data())
      });

      setEvents([...newEvents])
 
    }

    getEvents();

  }, [])

  const navigate = useNavigate()
  const location = useLocation();

  const getEvent = (id) => {
    const event = events.find(e => e.id === id)
    if(event){
      setEvent(event);
      navigate(`${id}`)
    }  
  }

  const EventsList = () => {
    return(
      <Box sx={{ flexGrow: 1, maxWidth: '800px', width: '80vw', }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
              <Grid item>
                <Typography variant="h6" component="div">Events</Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => setNewEvent(true)} variant="contained">New Event</Button>
              </Grid>
            </Grid>              
            <Demo>
              <List sx={{ height:'80vh', overflowY:'auto'}}>
                {events.map((e,i) => (
                  <div key={`Event ${i}`}>
                  <ListItem onClick={() => getEvent(e.id)}>
                    <ListItemText
                      primary={`${e.date}`}
                      secondary={`${e.name}`}
                    />
                  </ListItem>
                  <Divider  component="li" />
                  </div>
                ))}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <div>
      { newEvent? <EventForm setNewEvent={setNewEvent} /> : <EventsList />}
    </div>
  )
}

