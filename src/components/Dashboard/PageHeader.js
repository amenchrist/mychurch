import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../../store';

function PageHeader() {

  const { currentPage, } = useMyStore();
  const navigate = useNavigate();


  return (
    <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0', }}>
      <CardMedia sx={{ height: 140 }} image="Jesus.jpg" title="Cover photo" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currentPage?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currentPage?.bio || 'No bio yet'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Visit Website</Button>
      </CardActions>
      <ButtonGroup variant="contained" aria-label="Basic button group" fullWidth >
            <Button sx={{ borderRadius: 0, }} onClick={() => navigate(`/${currentPage.handle}`)}>Posts</Button>
            <Button sx={{ borderRadius: 0, }} onClick={() => navigate(`/${currentPage.handle}/events`)}>Events</Button>
          </ButtonGroup>
    </Card>
  )
}

export default PageHeader