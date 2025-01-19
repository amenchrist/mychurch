import React, { useEffect, useState } from 'react'
import { useMyStore } from '../store';
import { styled } from '@mui/material/styles';
import { ListItemText, ListItem, Box, List, IconButton, Button, Grid, Divider, Typography } from '@mui/material';
import EventForm from '../components/EventForm';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Events() {

  const { currentPage, setEvent } = useMyStore();
  const [ newEvent, setNewEvent ] = useState(false);
  const [ events, setEvents ] = useState([]);
  const navigate = useNavigate();

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  
  useEffect(() => {


    (async () => {
      try {
        const events = await currentPage.getEvents()
        if(events){
          setEvents(events)
        }
      }catch (err) {
        console.log("Error getting Events")
        console.log(err)
      } 
    })()

  }, [currentPage])

  const getEvent = (id) => {
    const event = events.find(e => e.id === id)
    if(event){
      setEvent(event);
      navigate(`${id}`)
    }  
  }

  const removeEvent = async (e) => {
    try {
        const success = await currentPage.deleteEvent(e);
        if(success){
          setEvent(null);
          navigate(`/${currentPage.handle}/events`);
        }
      } catch (err) {
        console.log('Error deleting event')
        console.log(err);
      }    
  }

  const EventsList = () => {
    return(
      <Box sx={{ flexGrow: 1, maxWidth: '800px', }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container justifyContent="space-between" sx={{ mt: 4, mb: 2, p: 2}}>
              <Grid item>
                <Typography variant="h6" component="div">Events</Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => setNewEvent(true)} variant="contained">New Event</Button>
              </Grid>
            </Grid>              
            <Demo>
              <List sx={{ height:'80vh', overflowY:'auto'}}>
                {events?.filter((i) => i.hasEnded === false).map((event,i) => (
                  <div key={`Event ${i}`}>
                  <ListItem >
                    <ListItemText
                      onClick={() => getEvent(event.id)}
                      primary={`${event.name}`}
                      secondary={event.formattedDate()}
                    />
                      <IconButton edge="end" aria-label="delete" onClick={() => removeEvent(event)} ><DeleteIcon /></IconButton>
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

