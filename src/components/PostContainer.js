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


function PostContainer({post} ) {

  const { currentPage, follower } = useMyStore();

  return (
    <Card sx={{ minHeight: 500, border: '2px solid', borderRadius: '0'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.name || "Shrimp and Chorizo Paella"}
        subheader={ post?.formattedDate() || "September 14, 2016"}
      />
      <CardMedia
        component="img"
        height="194"
        image="paella.jpg"
        alt="Paella dish"
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
      {follower?.userID && follower?.role !== 'SUBSCRIBER' ?
        <></> :
        <>
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.primary', paddingBottom: 0}}>
              Attendance: {post?.totalAttendance || "N/A"}
            </Typography>
          </CardContent>
          <CardActions>
          <Button size="medium">See Report</Button>
        </CardActions>
        </>
      }
    </Card>
  )
}

export default PostContainer







