import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { useMyStore } from '../store';
import date from 'date-and-time';

export default function Schedule() {


    const [ height, setHeight ] = useState('90%');
    const [ events, setEvents ] = useState([])
    const { currentPage, setEvent, setNextEvent } = useMyStore();

    useEffect(() => {
        if(window.innerWidth > 900){
        setHeight('80%');
        }
    }, [])

    useEffect(() => {

        const getEvents = async () => {
          const q = query(collection(db, "events"), where("parentPageID", "==", currentPage.id));     
          const querySnapshot = await getDocs(q); 
          const newEvents = []
    
          querySnapshot.forEach((doc) => {
            const event = doc.data()
            newEvents.push(event)
            if(event.date === `2024-15-04`){
                setEvent(event)
            }
            // setNextEvent(event)
          });    
          setEvents([...newEvents])     
        }
    
        getEvents();
    
      }, [currentPage, setEvent])

    //   console.log(dayjs('2024-04-17').toDate().toLocaleDateString('en-US', { weekday: 'long' }))
    //   console.log(date.format(new Date(), 'dddd, MMMM, DDD'))


  return (
        <Box sx={{ width: '100%',  padding: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container justifyContent="flex-start" sx={{ mt: 1, mb: 2 }}>
              <Grid item>
                <Typography variant="h6" component="div">Next Events</Typography>
              </Grid>
            </Grid>              
              <List sx={{ height:'80vh', overflowY:'auto', }}>
                {events.map((e,i) => (
                  <div key={`Event ${i}`}>
                  <ListItem sx={{bgcolor: 'background.paper', mb: 2 }}>
                    <ListItemText
                      primary={`${e.name}`}
                      secondary={`${date.format(new Date(e.date), 'dddd, MMMM DD')} @ ${e.time}`}
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

 