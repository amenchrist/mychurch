import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useMyStore } from '../../store';

function PageHeader() {

  const { currentPage, } = useMyStore();

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
    </Card>
  )
}

export default PageHeader