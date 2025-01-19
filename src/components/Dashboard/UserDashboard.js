import React from 'react'
import { useMyStore } from '../../store';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PostContainer from '../PostContainer';
import BottomNav from '../BottomNav';
export default function UserDashboard() {

  const { currentPage } = useMyStore();

  return (
    <>
    <div style={{height: '95vh', overflowY: 'auto'}}>
      <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0' }}>
        <CardMedia
          sx={{ height: 140 }}
          image="Jesus.jpg"
          title="Cover photo"
        />
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
        <div style={{ overflowY: 'auto',  width: '100%', border: '2px solid', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          <PostContainer />
          <PostContainer />
          <PostContainer />
        </div>
      </Card>
    </div>
    </>
  )
}
