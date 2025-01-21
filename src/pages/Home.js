import React from 'react'
import BottomNav from '../components/BottomNav'
import PostContainer from '../components/PostContainer'
import { Card } from '@mui/material'

function Home() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{height: '90vh', overflowY: 'auto'}}>
        <Card sx={{ maxWidth: 500, width: '100vw', borderRadius: '0' }}>
        <div style={{height: 100, width: '100%',  border: '2px solid', paddingLeft: 5}}>
          Events
        </div>
          <div style={{ overflowY: 'auto',  width: '100%', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
            {new Array(20).fill('Hello').map((e, i) => (
              <>
                <PostContainer key={i} />
              </>
            ))}
            <></>
          </div>
        </Card>
      </div>
      <BottomNav />  
    </div>
    // <>
    // <div style={{maxWidth: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100vw', height: '90vh', overflowY: 'auto'}}>
    //   <div style={{height: '100', width: '100%',  border: '2px solid'}}>
    //     Events
    //   </div>
    //   <div style={{ width: '100%', border: '2px solid', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
    //     Timeline
    //     <PostContainer />
    //     <PostContainer />
    //     <PostContainer />
    //     <PostContainer />
    //     <PostContainer />
    //     <PostContainer />
    //     <PostContainer />
    //     <PostContainer />
    //   </div>
    // </div>
    //   <div style={{height: '10vh', width: '100%', border: '2px solid', display: 'flex', justifyContent: 'center'}}>
    //     <BottomNav />
    //   </div>
    // </>
  )
}

export default Home