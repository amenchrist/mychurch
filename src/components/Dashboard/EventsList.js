import React from 'react';
import { List, Button, Box, IconButton, Grid, Divider, Typography, ListItemText, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import { useNavigate } from 'react-router-dom';

export default function EventsList() {

  const { events, setShowEventReport, setEvent } = useDashboardContext();
  const navigate = useNavigate();

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
            <Grid container justifyContent="space-between" sx={{ mt: 4, mb: 2 }}>
              <Grid item>
                <Typography variant="h6" component="div">Event Reports</Typography>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={()=> navigate('page-profile')}>Page Profile</Button>
              </Grid>
            </Grid>              
            <Demo>
              <List sx={{ height:'50vh', overflowY:'auto'}}>
                {events.filter((i) => i.hasStarted === true).map((e,i) => (
                  <div key={`Event ${i}`}>
                  <ListItem >
                    <ListItemText
                      onClick={() => getEvent(e.id)}
                      primary={`${e?.name}`}
                      secondary={e?.formattedDate()}
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
