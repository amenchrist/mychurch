import React, { useEffect, useState } from 'react'
import { useMyStore } from '../store';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dayjs from 'dayjs';


function PostCollection() {

  const { currentPage } = useMyStore();
    const [ posts, setPosts ] = useState([])
  
    useEffect(() => {
      (async () => {
        try {
          const posts = await currentPage.getPosts()
          const events = await currentPage.getEvents()
          if(posts){
            setPosts([posts, ...events.filter((e)=> e.hasStarted).sort((e1,e2) => dayjs(e2.date) - dayjs(e1.date))])
          }
        }catch (err) {
          console.log("Error getting Events")
          console.log(err)
        } 
      })()
    }, [])

  return (
    <div style={{ overflowY: 'auto',  width: '100%', border: '2px solid', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          { posts.map((post, i) => 
            <Card sx={{ minHeight: 50,  borderRadius: '0', mb: 1}} key={i}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                  {currentPage.name[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" >
                  <MoreVertIcon />
                </IconButton>
              }
              title={currentPage?.name}
              subheader={ post?.name || "September 14, 2016"}
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
                {post?.bio || post?.totalAttendance? `Attendance: ${post?.totalAttendance}` : " Lorem Ipsum"}
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
  )
}

export default PostCollection