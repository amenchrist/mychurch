import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';


function PostContainer({post} ) {

  const { currentPage, follower, setEvent } = useMyStore();
  const navigate = useNavigate();

  function openEventSettings(){
    navigate(`/${currentPage.handle}/events/${post.id}/settings`)
  }

  function openEvent(){
    setEvent(post);
    navigate(`/${currentPage.handle}/events/${post.id}/`)
  }
  

  return (
    <Card sx={{ minHeight: 50,  borderRadius: '0'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={openEventSettings}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.name || "Shrimp and Chorizo Paella"}
        subheader={ post?.formattedDate() || "September 14, 2016"}
      />
      <CardMedia
        component="img"
        height="194"
        image={currentPage?.bannerURL}
        alt="Church Experience"
        onClick={openEvent}
      />
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
      {follower?.userID && follower?.role === 'SUBSCRIBER' && post.type !== "EVENT"? <></> :
        <Typography variant="body2" sx={{ pl:1, color: 'text.primary', }}>
          Attendance: {post?.totalAttendance || "N/A"}
        </Typography>}
    </Card>
  )
}

export default PostContainer







