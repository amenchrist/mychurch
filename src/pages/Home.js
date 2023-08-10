import React from 'react';
import Post from '../components/timeline/Post';
import Sidebar from '../components/timeline/Sidebar';

function Home() {
  return (
    <div>Home
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
            <Sidebar />
            <div style={{border: '2px solid', height: '100%', width: '500px', overflowY: 'auto'}}>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    </div>
  )
}

export default Home