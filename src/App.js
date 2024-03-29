import { useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Router from './routes';
import { useMyStore } from './store';
import ThemeProvider from './theme';
import { useLocation, useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from './config/firebase';
import { Page } from './classes';
import { Hidden } from '@mui/material';

function App() {

  const {user, setUser, setCurrentPage, currentPage } = useMyStore()

  // const location = useLocation();
  // const parent = window.parent.location.hostname
  // console.log(currentPage)
  // console.log(typeof console.log)
  

  //FOR OFFLINE DEVELOPMENT
  // useEffect(() => {
  //   const mockUser = {
  //     email: 'amen@amen.com',
  //     id: 9789584,
  //     contactInfo: {
  //       email: 'amen@amen.com',
  //       phoneNumber: 12344567,
  //       address: {
  //         houseNameOrNumber: "houseNameOrNumber", 
  //         street: "street", 
  //         cityOrTown: "cityOrTown", 
  //         state: "state", 
  //         county: "county", 
  //         country: "country", 
  //         postOrZipCode: "postOrZipCode"
  //       }
  //     },
  //     pages: ['celovechurch'],
  //     likedPosts: [],
  //     savedPosts: [],
  //     events: [],
  //     notes: [],
  //     reviews: [],
  //     type: 'SUPERUSER',
  //     biodata: {
  //       firstName: 'Amen',
  //       title: 'Bro',
  //       lastName: 'Christ',
  //     },
  //     role: 'ADMINISTRATOR'
  //   }
  //   setUser(mockUser)
  // }, [setUser])

  // useEffect(() => {

  //   const mockPage = {
  //       type: 'CHURCH',
  //       avatarURL: "avatarURL", 
  //       bannerURL: "bannerURL", 
  //       name: "Christ Embassy Love Church", 
  //       handle: "celovechurch", 
  //       bio: "bio", 
  //       contactInfo: {
  //         email: 'amen@amen.com',
  //         phoneNumber: 12344567,
  //         address: {
  //           houseNameOrNumber: "houseNameOrNumber", 
  //           street: "street", 
  //           cityOrTown: "cityOrTown", 
  //           state: "state", 
  //           county: "county", 
  //           country: "country", 
  //           postOrZipCode: "postOrZipCode"
  //         }
  //       },
  //       followers: [{
  //         userID: 9789584,
  //         isMember: false,
  //         role: 'ADMINISTRATOR',
  //         pagePosts: []
  //     }],
  //       events: [],
  //       posts: [],
  //       bankDetails: [],
  //       transactions: [],
  //       chats: [],
  //       creatorID: 9789584,
  //       id: 'abcdefg',
  //       creationTimestamp: new Date().getTime(),
  //       websiteURL: 'https://christembassybarking.org'
  //   }

  //   setCurrentPage(mockPage);

  // }, [setCurrentPage])

  // console.log(user)
  // console.log(currentPage)



  //COMPONENTS BELOW\2

  function Home() {
    return (
      <div style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
        {/* <Sidebar /> */}
        <Router />
      </div>
    )
  }

  return (
    <div style={{height: '100vh', overflowY: 'hidden' }}>
      <ThemeProvider>
        <Home /> 
      </ThemeProvider>
    </div>
  );
}

export default App;

