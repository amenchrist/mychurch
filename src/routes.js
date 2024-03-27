import {  useRoutes, Navigate, useLocation } from 'react-router-dom';
// import DashboardLayout from './components/adminDashboard/DashboardLayout';
// import MemberDashboardLayout from './components/memberDashboard/MemberDashboardLayout';
// import { Offerings, Tithes, Partnerships, SpecialSeeds, OtherGiving, GivingSummary } from './pages/@memberDashboard';
// import { ServiceSummary, Attendees, FirstTimers, Absentees, GivingRecord, Members, YearOverview } from './pages/@adminDashboard';
// import WatchPage from './pages/@watchPage/WatchPage';
import SignInSide from './pages/SignIn';
// import Home from './pages/Home';
import { auth, db } from './config/firebase';
import WatchPage from './pages/@watchPage/WatchPage';
import Dashboard from './pages/Dashboard';
import NewsFeed from './pages/NewsFeed';
import Profile from './pages/Profile';
import GivingRecords from './pages/GivingRecords';
import Church from './pages/Church';
import Events from './pages/Events';
import Notes from './pages/Notes';
import Testimonies from './pages/Testimonies';
import WatchLive from './pages/WatchLive';
import Notifications from './pages/Notifications';
import Conversations from './pages/Conversations';
import { SignUpForm } from './components/SignUpForm';
import AdminPage from './pages/AdminPage';
import { useMyStore } from './store';
import { SignInForm } from './components/SignInForm';
import Reports from './pages/Reports';
import MemberDatabase from './pages/MemberDatabase';
import Admins from './pages/Admins';
import NewPage from './components/NewPage';
import ErrorPage from './pages/ErrorPage';
import Pages from './pages/Pages';
import { useEffect, useState } from 'react';
import Home from './layouts/Home';
import { doc, getDoc } from "firebase/firestore";
import { Page } from './classes';
import ComingSoon from './pages/ComingSoon';
import GivingForm from './components/WatchPage/GivingForm';


export default function Router() {

  //IMPORTING RELEVANT VARIABLES
  const { user, currentPage, setCurrentPage } = useMyStore();
  
  /**
   * GET THE HANDLE FROM THE URL
   * RETRIEVE THE CURRENT PAGE DETAILS FROM HANDLE
   * SET USER
   */
  
  //GETTING THE RELEVANT PAGE FROM THE URL
  const location = useLocation();
  const [ pageRef, setPageRef ] = useState(location.pathname.substring(1)) 
  
  useEffect(() => {
    console.log('running useEffect 2 page refs ')
    console.log(pageRef)
    
    if (pageRef.includes('/')){
      setPageRef(pageRef.replace(/\/.*/gm, ''))
    }
  }, [pageRef]);
  
  console.log(pageRef)
  
  useEffect(() => {
    console.log('running useEffect 3 getting the page')

    const getPage = async () => {

      console.log('running get page')

      try {
        const docRef = doc(db, 'pages', pageRef)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          setCurrentPage(new Page(docSnap.data()));
        } else {
          console.log('Page not found');
        }
      } catch (err) {
        console.log(err);
      }
    }
    
    if(pageRef !== currentPage?.handle){
      console.log(pageRef);
      console.log(currentPage);
      getPage();
    }
    
  }, [pageRef, setCurrentPage, currentPage])
  
  
  //ENABLING ADMIN PRIVILEGES
  const [ isAdmin, setIsAdmin ] = useState(false);
  useEffect(() => {
    console.log('running useEffect 1 about admin')
    if (!isAdmin){
      const admins = currentPage?.followers?.filter(f => f.role === 'ADMINISTRATOR');
      const adminIDs = admins?.map(a => a.id);
      if (adminIDs?.includes(user.id)){
        setIsAdmin(true)
      }
    }
  }, [isAdmin, currentPage, user])
  
  const routes = [
    { path: '/', element: <GivingForm /> } ,
    { 
      path: '/give', 
      element: user.email? <Home /> : <SignInForm />,
      children: [
        {
          path: pageRef? pageRef : '',
          children: [
            { path: '', element: user.email? <Dashboard />: <SignInForm /> },
            { path: 'giving-records', element: user.email? <GivingRecords/>: <SignInForm /> },
            { path: 'conversations', element: <ComingSoon /> }, //user.email?<Conversations />: <SignInForm /> },
            { path: 'notifications', element: <ComingSoon /> }, //user.email?<Notifications/>: <SignInForm /> },
            { path: 'testimonies', element: <ComingSoon /> }, //user.email?<Testimonies/>: <SignInForm /> },
            { path: 'notes', element: <ComingSoon /> }, //user.email?<Notes/>: <SignInForm /> },
            { path: 'events', element: user.email?<Events />: <SignInForm /> },
            { path: 'news-feed', element: <ComingSoon /> }, //user.email?<NewsFeed/>: <SignInForm /> },
            { path: 'profile', element: user.email?<Profile/>: <SignInForm /> },
            { path: 'church', element: <Church /> },
            { path: 'signin', element: <SignInForm /> },
            { path: 'signup', element: <SignUpForm /> },
            { path: 'reports', element: <Reports /> },
            { path: 'members', element: <MemberDatabase /> },
            { path: 'admins', element: <Admins /> },
            { path: 'pages', element: user.type === 'SUPERUSER'? <Pages />: 'hello amen' },
            { path: 'create-page', element: user.type === 'SUPERUSER'? <NewPage/>: <ErrorPage /> },
            { path: 'page-profile', element:  isAdmin ? <Pages />: <ErrorPage /> },
            { path: 'admin', element: user.email?<AdminPage />: <SignInForm /> },

          ]
        }
      ],
    },
    { path: pageRef+'/watch', element: <WatchPage /> },
    // { path: pageRef+'/watch', element: <WatchLive /> },
    { path: '*', element: <ErrorPage /> },
    { path: '/', element: user.email? <Dashboard/> : <SignInForm /> },
    { path: 'giving-records', element: user.email? <GivingRecords/>: <SignInForm /> },
    { path: 'conversations', element: user.email?<Conversations />: <SignInForm /> },
    { path: 'notifications', element: user.email?<Notifications/>: <SignInForm /> },
    { path: 'testimonies', element: user.email?<Testimonies/>: <SignInForm /> },
    { path: 'notes', element: user.email?<Notes/>: <SignInForm /> },
    { path: 'events', element: user.email?<Events />: <SignInForm /> },
    { path: '/news-feed', element: user.email?<NewsFeed/>: <SignInForm /> },
    { path: 'profile', element: user.email?<Profile/>: <SignInForm /> },
    { path: 'church', element: <Church /> },
    { path: 'watch', element: <WatchPage /> },
    { path: 'watch', element: <WatchLive /> },
    { path: 'signin', element: <SignInForm /> },
    { path: 'signup', element: <SignUpForm /> },
    { path: 'reports', element: <Reports /> },
    { path: 'members', element: <MemberDatabase /> },
    { path: 'admins', element: <Admins /> },
    { path: 'create-page', element: user.type === 'SUPERUSER'? <NewPage/>: <ErrorPage /> },
    { path: 'pages', element: user.type === 'SUPERUSER'? <Pages />: <ErrorPage /> },
    { path: 'page-profile', element:  isAdmin ? <Pages />: <ErrorPage /> },
    { path: 'admin', element: user.email?<AdminPage />: <SignInForm /> } 
  ]

  // console.log(user)
  // console.log(currentPage)

  return useRoutes(routes);

}

