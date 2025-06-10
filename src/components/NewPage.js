import { collection, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Page from '../classes/Page';
import { db } from '../config/firebase';
import { useMyStore } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';


function NewPage({setCreatePageMode}) {

    const [ error, setError ] = useState(false);

    const { setCurrentPage, toggleAdminMode, user, } = useMyStore();
    const navigate = useNavigate();

    const [ avatarURL, setAvatarURL ] = useState('');
    const [ bannerURL, setBannerURL ] = useState('');
    const [ name, setName ] = useState(`${user.bioData.firstName} ${user.bioData.lastName}`);
    const [ handle, setHandle ] = useState('');
    const [ handleExists, setHandleExists ] = useState(false);
    const [ bio, setBio ] = useState('');
    const [ websiteURL, setWebsiteURL ] = useState('');
    const [ liveStreamURL, setLiveStreamURL ] = useState('');
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState('');
    
    const [ houseNameOrNumber, setHouseNameOrNumber ] = useState('');  
    const [ street, setStreet ] = useState('');  
    const [ cityOrTown, setCityOrTown ] = useState('');  
    const [ state, setState ] = useState('');  
    const [ county, setCounty ] = useState('');  
    const [ country, setCountry ] = useState('');  
    const [ postOrZipCode, setPostOrZipCode ] = useState('');  

    const address = { houseNameOrNumber, street, cityOrTown, state, county, country, postOrZipCode }
    const contactInfo = { email, phoneNumber, address };

    const firstFollower = {
      id: user.id,
      isMember: false,
      role: 'ADMINISTRATOR',
      pagePosts: []
    }

    const newPage = {
      id: uuidv4(),
      type: 'CHURCH',
      name,
      avatarURL, bannerURL, 
      handle, bio, contactInfo, websiteURL, liveStreamURL,
      followers: [firstFollower],
      events: [],
      posts: [],
      bankDetails: [],
      transactions: [],
      chats: [],
      creatorID: user.id,
      creationTimestamp: new Date().getTime()
    }

    const checkHandle = () => {

    }

    const offlineCreatePage = () => {
      setCurrentPage(new Page((newPage)));
      navigate(`/${handle}`);
    }

    const createPage = async () => {
    const pagesRef = collection(db, 'pages'); 

      try {
          console.log(newPage)
          await setDoc(doc(pagesRef, handle), newPage);
          // await updateDoc(doc(db,'userProfiles', user.email), {pages: user.pages.push(newPage.handle)});
          await updateDoc(doc(db,'userProfiles', user.email), {pages: arrayUnion(newPage.handle)});
          setCurrentPage(new Page((newPage)));
          console.log('New User Added');
          toggleAdminMode(true);
          navigate('/pages');
      } catch (err) {
          console.log(err);
      }
    }

    (<div style={{width: '400px', display: 'flex', flexDirection: 'column', height: '400px'}}>
      <div onClick={() => setCreatePageMode(false)}>{'Back to Pages List'}</div>
      <br/>
  </div>)

  return (

    <Box component="form" onSubmit={offlineCreatePage} sx={{ width:450,  mt:2, p:1, overflowY: 'auto'}} onFocus={() => setError(false)} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Create a New Page</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField autoFocus required fullWidth id="handle" label="Page Handle" value={handle} onChange={(e) => setHandle(e.target.value)} error={handleExists} onBlur={() => setHandleExists(checkHandle(handle))} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline id="Bio" label="Biography" value={bio} onChange={(e) => setBio(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="streamURL" label="Stream Link" value={liveStreamURL} onChange={(e) => setLiveStreamURL(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="websiteURL" label="Website" value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Create Page</Button>
        </Box>
    
    
  )
}

export default NewPage