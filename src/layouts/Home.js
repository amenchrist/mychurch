import React from 'react';
import Post from '../components/timeline/Post';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
            <Sidebar />
            <Outlet />
        </div>
  )
}

export default Home