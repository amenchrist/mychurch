import React from 'react'
import BottomNav from '../components/BottomNav'
import PostContainer from '../components/PostContainer'

function Home() {
  return (
    <div>
      <div style={{height: '20vh', width: 500,  border: '2px solid'}}>
        Events
      </div>
      <div style={{height: '75vh', width: 500, border: '2px solid'}}>
        Timeline
        <PostContainer />
      </div>
      <div style={{height: '5vh', width: 500, border: '2px solid', display: 'flex', justifyContent: 'center'}}>
        <BottomNav />
      </div>
    </div>
  )
}

export default Home