import React from 'react';
import { List, Box, IconButton, Grid, Divider, Typography, ListItemText, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';

export default function EventsList() {

  const { events, setShowEventReport, setEvent } = useDashboardContext();

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const getEvent = (id) => {
    const e = events.find(e => e.id === id)
    if(e){
      setShowEventReport(true);
      setEvent(e)
    }  
  }

  return (
    <>
      {/* {adminMode? <AdminDashboard /> : <MemberDashboard />} */}
      <Box sx={{ flexGrow: 1, maxWidth: '800px', width: '80vw', }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container justifyContent="flex-start" sx={{ mt: 4, mb: 2 }}>
              <Grid item>
                <Typography variant="h6" component="div">Event Reports</Typography>
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
                      <IconButton edge="end" >{e.totalAttendance}</IconButton>
                  </ListItem>
                  <Divider  component="li" />
                  </div>
                ))}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
