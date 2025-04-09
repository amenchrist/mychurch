import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../../store';

function PageHeader() {

  const { currentPage, user } = useMyStore();
  const navigate = useNavigate();
  const church = user?.church?.toLowerCase().replace(/\s/g, '');

  const ChurchDashNav = () => {
    return(
      <ButtonGroup variant="contained" aria-label="Basic button group" fullWidth >
        <Button sx={{ borderRadius: 0, }} onClick={() => navigate(`/${currentPage.handle}`)}>Posts</Button>
        <Button sx={{ borderRadius: 0, }} onClick={() => navigate(`/${currentPage.handle}/events`)}>Events</Button>
      </ButtonGroup>
    )
  }

  const UserDashNav = () => {
    return(
      <ButtonGroup variant="contained" aria-label="Basic button group" fullWidth >
        <Button sx={{ borderRadius: 0, }} onClick={() => navigate(`/${currentPage.handle}`)}>Profile</Button>
        <Button sx={{ borderRadius: 0, }} onClick={() => navigate(`/${currentPage.handle}/transactions`)}>Giving</Button>
        <Button sx={{ borderRadius: 0, }} onClick={() => navigate(`/${currentPage.handle}/posts`)}>Posts</Button>
      </ButtonGroup>
    )
  }



  return (
    <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0', }}>
      <CardMedia sx={{ height: 140 }} image={currentPage.type === "USER"? "default bg.jpg" : "Jesus.jpg"} title="Cover photo" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currentPage?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currentPage?.bio || 'No bio yet'}
        </Typography>
      </CardContent>
      {currentPage.type === "USER"? <></> : 
        <CardActions>
        <Button size="small">Visit Website</Button>
        {currentPage.type === "USER"? '' : <Button size="small" onClick={() => navigate(`/${currentPage.handle}/watch`)}>Watch Live Stream</Button>}
        </CardActions>
      }
      {currentPage.type === "USER"? <UserDashNav /> : <ChurchDashNav />}
      
    </Card>
  )
}

export default PageHeader