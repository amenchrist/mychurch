import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMyStore } from '../store';
import dayjs from 'dayjs';
import BottomNav from './BottomNav';


export default function Schedule() {


    const [ events, setEvents ] = useState([])
    const { currentPage, event, setEvent, nextEvent, setNextEvent } = useMyStore();

    useEffect(() => {
      const getEvents = async () => {
        // console.log('searching for all events')
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
          }
        }catch (err) {
          console.log("Error getting Events by date")
          console.log(err)
        } 
      }
      getEvents();
  
    }, [currentPage, setEvent, setNextEvent, nextEvent, event])

    const ongoingEvent = events.find(e => e.hasStarted && e.hasEnded === false);
    useEffect(() => {
      if(ongoingEvent !== undefined && ongoingEvent?.id !== event?.id){
        setEvent(ongoingEvent);
      } 
    }, [ongoingEvent, event, setEvent]);


  return (
      <Box sx={{ width: '100%',  display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} >
            <Box>
              <Grid container justifyContent="flex-start" sx={{ p: 1, }}>
                <Grid item>
                  <Typography variant="h6" component="div">Schedule</Typography>
                </Grid>
              </Grid>              
              <List >
                <Box sx={{ height:'40vh', overflowY:'auto', }}>
                  {events.map((e,i) => (
                    <div key={`Event ${i}`}>
                    <ListItem sx={{bgcolor: 'background.paper', }}>
                      <ListItemText
                        primary={`${e.name} ${e.hasStarted && !e.hasEnded ? `[LIVE NOW]`: ''}`}
                        secondary={e?.formattedDate()}
                      />
                    </ListItem>
                    </div>
                  ))}
                </Box>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
}

 