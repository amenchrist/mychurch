import React, { useEffect, useState } from 'react'
import { useMyStore } from '../store';
import { styled } from '@mui/material/styles';
import { ListItemText, ListItem, Box, List, IconButton, Button, Grid, Divider, Typography } from '@mui/material';
import EventForm from '../components/EventForm';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

export default function Events() {

  const { currentPage, setEvent } = useMyStore();
  const [ newEvent, setNewEvent ] = useState(false);
  const [ events, setEvents ] = useState([])

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  
  useEffect(() => {

    const getEvents = async () => {

      const querySnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events`)); 
      const newEvents = []

      querySnapshot.forEach((doc) => {
        newEvents.push(doc.data())
      });
      newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
      setEvents([...newEvents])
 
    }

    getEvents();

  }, [])

  const navigate = useNavigate()

  const getEvent = (id) => {
    const event = events.find(e => e.id === id)
    if(event){
      setEvent(event);
      navigate(`${id}`)
    }  
  }

  const deleteEvent = async (e) => {
    try {
        await deleteDoc(doc(db, 'events', e.id));
        setEvent(null);
        navigate(`/${currentPage.handle}/events`);
      } catch (err) {
        console.log('Error deleting event')
        console.log(err);
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
                  <ListItem >
                    <ListItemText
                      onClick={() => getEvent(e.id)}
                      primary={`${e.name}`}
                      secondary={dayjs(e.date).format('dddd, MMMM DD @ hh:mm a')}
                    />
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteEvent(e)} ><DeleteIcon /></IconButton>
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

