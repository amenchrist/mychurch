import React, { useState } from 'react'
import { useMyStore } from '../store';
import Event from '../components/Event';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Events() {

  const { event, setEvent } = useMyStore();
  const [ newEvent, setNewEvent ] = useState(false);

  const style = {
    height: '100px',
    border: '2px solid',
    maxWidth: '470px',
    width: '90vw',
    marginBottom: '5px'
  }

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const arr = new Array(15).fill(1);

  const EventsList = () => {
    return(
      // <>
      // <div style={{padding: '15px 0'}}><h2>Events</h2></div>
      // <div style={{height: '95vh', overflowY:'auto'}}>
      //   <div style={{...style, padding: '5px'}} onClick={() => setNewEvent(true)} >
      //     <h3> + New </h3>
      //   </div>
      //   {arr.map((e,i) => {
      //     return (
      //       <div style={style} key={i}>
      //         <p>Event {e+i}</p>
      //       </div>
      //     )})
      //   }        
      // </div>
      // </>
      <Box sx={{ flexGrow: 1, maxWidth: 752, width: '800px', }}>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Events
            </Typography>
            <Demo>
              <List sx={{ height:'80vh', overflowY:'auto'}}>
                <ListItem onClick={() => setNewEvent(true)}>
                    <ListItemText
                      primary={`+ New Event`}
                    />
                </ListItem>
                <Divider  component="li" />
                {arr.map((e,i) => (
                  <>
                  <ListItem key={i}>
                    <ListItemText
                      primary={`Event ${e+i}`}
                      secondary={'Secondary text'}
                    />
                  </ListItem>
                  <Divider  component="li" />
                  </>
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
      { newEvent? <Event setNewEvent={setNewEvent} /> : <EventsList />}
    </div>
  )
}

