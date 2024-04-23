import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { and, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { useMyStore } from '../store';
import dayjs from 'dayjs';


export default function Schedule() {


    const [ height, setHeight ] = useState('90%');
    const [ events, setEvents ] = useState([])
    const { currentPage, event, setEvent, nextEvent, setNextEvent } = useMyStore();

    useEffect(() => {
        if(window.innerWidth > 900){
        setHeight('80%');
        }
    }, [])

    useEffect(() => {

        const getEvents = async () => {

          try {
            const querySnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events`)); 
            const newEvents = []
      
            querySnapshot.forEach((doc) => {
              const curEvent = doc.data()
              if(dayjs(curEvent.date).toDate().getTime() >= new Date().getTime() || curEvent.hasStarted){
                  newEvents.push(curEvent)
                  if(curEvent.hasStarted && event === null){
                      setEvent(curEvent);
                  }
              }
            });
            newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
            if(nextEvent && nextEvent?.id !== newEvents[0].id ){
                setNextEvent(newEvents[0])
            }
            setEvents([...newEvents])        
          } catch (err) {
            console.log('Error retrieving scheduled events');
            console.log(err)
          }
        }         
        
        getEvents();
    
      }, [currentPage, setEvent, setNextEvent, nextEvent, event])

  return (
        <Box sx={{ width: '100%',  padding: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container justifyContent="flex-start" sx={{ mt: 1, mb: 2 }}>
              <Grid item>
                <Typography variant="h6" component="div">Schedule</Typography>
              </Grid>
            </Grid>              
              <List sx={{ height:'80vh', overflowY:'auto', }}>
                {events.map((e,i) => (
                  <div key={`Event ${i}`}>
                  <ListItem sx={{bgcolor: 'background.paper', mb: 2 }}>
                    <ListItemText
                      primary={`${e.name} ${e.hasStarted && !e.hasEnded ? `[LIVE NOW]`: ''}`}
                      secondary={dayjs(e.date).format('dddd, MMMM DD @ hh:mm a')}
                    />
                  </ListItem>
                  </div>
                ))}
              </List>
          </Grid>
        </Grid>
      </Box>
    )
}

 