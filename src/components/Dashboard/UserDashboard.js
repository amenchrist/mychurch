import React, { useEffect, useState } from 'react'
import { useMyStore } from '../../store';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PostContainer from '../PostContainer';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageHeader from './PageHeader';

export default function UserDashboard() {

  const { currentPage } = useMyStore();
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const posts = await currentPage.getPosts()
        if(posts){
          setPosts(posts)
        }
      }catch (err) {
        console.log("Error getting Events")
        console.log(err)
      } 
    })()
  })

  return (
    <>
    <div style={{height: '95vh', overflowY: 'auto'}}>
      <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0' }}>
        <PageHeader />
        <div style={{ overflowY: 'auto',  width: '100%', border: '2px solid', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          { posts.map((post) => 
            <Card sx={{ minHeight: 50,  borderRadius: '0', mb: 1}}>
            <CardHeader 
              avatar={
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" >
                  <MoreVertIcon />
                </IconButton>
              }
              title={currentPage?.name}
              subheader={ post?.text || "September 14, 2016"}
            />
            {/* // <CardMedia
            //   component="img"
            //   height="194"
            //   image={currentPage?.bannerURL}
            //   alt="Church Experience"
            //   onClick={openEvent}
            // /> } */}
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {post?.bio || " Lorem Ipsum"}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              {/* <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}
            </CardActions>
          </Card>
          )}
        </div>
      </Card>
    </div>
    </>
  )
}
