import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMyStore } from '../store';
import dayjs from 'dayjs';
import { useWatchPageContext } from '../contexts/WatchPageContextProvider';


export default function Schedule() {

  const { events } = useWatchPageContext();

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

 