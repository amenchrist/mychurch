import React from 'react';
import Post from '../components/timeline/Post';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

export default Home