import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../../store';
import { Settings, Power as PowerIcon } from 'react-feather';


function PageHeader() {

  const { currentPage, user, setIsSignedIn, setUser } = useMyStore();
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

  //LOG USER OUT
    const logOut = async () => {
      try {
        await user.logOut();
        setIsSignedIn(false)
        setUser(null)
      } catch (err) {
        console.error(err);
      }
    };



  return (
    <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0', }}>
      <CardMedia sx={{ height: 140 }} image={currentPage?.type === "USER"? "default bg.jpg" : `${currentPage?.bannerURL}`} title="Cover photo" />
      <IconButton 
        onClick={logOut}
        sx={{ position: 'absolute', top: 8, right: 20, color: 'white' }}
        aria-label="log-out"
      >
        <PowerIcon  />
      </IconButton>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography gutterBottom variant="h5" component="div">
              {currentPage?.name}
            </Typography>
          </Grid>
          <Grid item>
            <Settings onClick={() => navigate(`/${currentPage.handle}/profile`)} sx={{width: '2px'}}/>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currentPage?.bio || 'No bio yet'}
        </Typography>
      </CardContent>
      {currentPage.type === "USER"? <></> : 
        <CardActions>
        <Button size="small" href={`${currentPage.websiteURL}`}>Visit Website</Button>
        <Button size="small" onClick={() => navigate(`/${currentPage.handle}/watch`)}>Watch Live Stream</Button>
        </CardActions>
      }
      {currentPage.type === "USER"? <UserDashNav /> : <ChurchDashNav />}
      
    </Card>
  )
}

export default PageHeader