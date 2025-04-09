import React from 'react'
import BottomNav from '../components/BottomNav'
import PostContainer from '../components/PostContainer'
import { Card, CardContent, Typography } from '@mui/material'

function Home() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{height: '90vh', overflowY: 'auto'}}>
        <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0' }}>
        <div style={{height: 100, width: '100%',  border: '2px solid', padding: 5}}>
          Ongoing Events
        </div>
          <div style={{ overflowY: 'auto',  width: '100%', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Your timeline is empty
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Your timeline is empty
            </Typography>
          </CardContent>
            {/* {new Array(20).fill('Hello').map((e, i) => (
              <>
                <PostContainer key={i} />
              </>
            ))} */}
            <></>
          </div>
        </Card>
      </div>
      <BottomNav />  
    </div> 
  )
}

export default Home