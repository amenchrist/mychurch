import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { and, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { useMyStore } from '../store';
import dayjs from 'dayjs';


export default function Schedule() {


    const [ events, setEvents ] = useState([])
    const { currentPage, event, setEvent, nextEvent, setNextEvent } = useMyStore();

    useEffect(() => {
      const getEvents = async () => {
        console.log('searching for all events')
        try {
          const events = await currentPage.getEvents()
          if(events){
            const relevantEvents = events.filter((e)=> (e.hasStarted && !e.hasEnded) || e.getTimestamp() >= new Date().getTime()).sort((e1,e2) => dayjs(e1.getTimestamp) - dayjs(e2.getTimestamp));

            const ongoingEvent = relevantEvents.find(e => e.hasStarted && e.hasEnded === false);
            if (ongoingEvent === undefined && event !== null){
              console.log("there's no ongoing event")
              setEvent(null)
            }

            if(nextEvent && nextEvent?.id !== relevantEvents[0]?.id ){
              if(relevantEvents[0] === undefined){
                setNextEvent(null)
              }else {
                setNextEvent(relevantEvents[0])
              }
            }
            if(nextEvent === null ){
              setNextEvent(relevantEvents[0])
            }
            
            setEvents([...relevantEvents])

            setEvents(relevantEvents)
            console.log(relevantEvents)
          }
        }catch (err) {
          console.log("Error getting Events by date")
          console.log(err)
        } 
      }
      getEvents()

      // const getEvents = async () => {

      //   try {
      //     const querySnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events`)); 
      //     const newEvents = [];
    
      //     querySnapshot.forEach((doc) => {
      //       const curEvent = doc.data()
      //       //Populate the schedule with upcoming and ongoing events
      //       if(dayjs(`${curEvent.date} ${curEvent.time}`).toDate().getTime() >= new Date().getTime() || (curEvent.hasStarted && !curEvent.hasEnded)){
      //           newEvents.push(curEvent)
      //       }
      //     });
      //     //
      //     const ongoingEvent = newEvents.find(e => e.hasStarted && e.hasEnded === false);
      //     if (ongoingEvent === undefined && event !== null){
      //       console.log("there's no ongoing event")
      //       setEvent(null)
      //     }

      //     newEvents.sort((e1,e2) => dayjs(`${e1.date} ${e1.time}`) - dayjs(`${e2.date} ${e2.time}`))
      //     if(nextEvent && nextEvent?.id !== newEvents[0]?.id ){
      //       if(newEvents[0] === undefined){
      //         setNextEvent(null)
      //       }else {
      //         setNextEvent(newEvents[0])
      //       }
      //     }
      //     if(nextEvent === null ){
      //       setNextEvent(newEvents[0])
      //     }
          
      //     setEvents([...newEvents])

      //   } catch (err) {
      //     console.log('Error retrieving scheduled events');
      //     console.log(err)
      //   }
      // }         
      
      getEvents();
  
    }, [currentPage, setEvent, setNextEvent, nextEvent, event])

    const ongoingEvent = events.find(e => e.hasStarted && e.hasEnded === false);
    useEffect(() => {
      if(ongoingEvent !== undefined && ongoingEvent?.id !== event?.id){
        setEvent(ongoingEvent);
      } 
    }, [ongoingEvent, event, setEvent]);


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
                      secondary={e?.formattedDate()}
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

 