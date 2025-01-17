import React from 'react'
import BottomNav from '../components/BottomNav'
import PostContainer from '../components/PostContainer'

function Home() {
  return (
    <div style={{maxWidth: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{height: '20vh', width: '100%',  border: '2px solid'}}>
        Events
      </div>
      <div style={{height: '75vh', overflowY: 'auto',  width: '100%', border: '2px solid', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
        Timeline
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </div>
      <div style={{height: '5vh', width: '100%', border: '2px solid', display: 'flex', justifyContent: 'center'}}>
        <BottomNav />
      </div>
    </div>
  )
}

export default Home