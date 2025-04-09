import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Post from '../classes/Post';

function NewPost() {
  const { user, currentPage } = useMyStore();
  const navigate = useNavigate();

  const [ text, setText ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();

  }

  const createPost = async (startDate) => { 
    const newPost = {
      id: `post_${uuidv4()}`,
      parentPageHandle: currentPage.handle,
      creatorID: user.id,
      timestamp: dayjs().toDate().toString(),
      text,
      content: [],
      caption: null,
      type: 'TEXT',
    }
    console.log(new Post(newPost))
    const success = await currentPage.addPost(new Post(newPost))
    if(success){
      // navigate(`/${currentPage.handle}`);
      navigate(`/`);
    }
  }

  
  return (
      <Container component="main" maxWidth="xs" sx={{ maxWidth: 500, width: '100vw', borderRadius: '0', }}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',  }} >
          <Typography component="h1" variant="h5">{'NEW POST'}</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{width: '80%'}}>
            <Box sx={{ mt: 3,  height:'80%', overflowY: 'auto', paddingTop:1, }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField autoFocus fullWidth multiline placeholder="What's the word on your heart?" value={text} onChange={(e) => setText(e.target.value)}/>
                </Grid>
              </Grid>
            </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, }} >Post</Button>
          </Box>
          <Grid container justifyContent="flex-end" sx={{ mt: 3, }} >
              <Grid item>
              {/* <Link href="/" variant="body2">Cancel</Link> */}
              <Typography variant='p' onClick={()=> navigate(`/${currentPage.handle}`)} >Back</Typography>
              </Grid>
          </Grid>
        </Box>
      </Container>
  )
}

export default NewPost