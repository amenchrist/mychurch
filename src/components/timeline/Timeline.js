import React from 'react'
import Post from './Post'

function Timeline() {
  return (
    <div style={{border: '2px solid', height: '100%', width: '500px', overflowY: 'auto'}}>
        <Post />
        <Post />
        <Post />
        <Post />
    </div>
  )
}

export default Timeline