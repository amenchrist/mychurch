import {  useRoutes, Navigate, useLocation, useParams } from 'react-router-dom';
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
import { useEffect, useMemo, useState } from 'react';
import Home from './layouts/Home';
import { doc, getDoc } from "firebase/firestore";
import { Page } from './classes';
import ComingSoon from './pages/ComingSoon';
import GivingForm from './components/WatchPage/GivingForm';
import { getPage } from './dbQueryFunctions';
import SignInPage from './pages/SignInPage';


export default function Router() {

  //IMPORTING RELEVANT VARIABLES
  const { isSignedIn, setIsSignedIn, user, setUser, currentPage, setCurrentPage, urlHandle, setUrlHandle } = useMyStore();
  
  /**
   * GET THE HANDLE FROM THE URL
   * RETRIEVE THE CURRENT PAGE DETAILS FROM HANDLE
   * SET USER
   */
  
  //GETTING THE RELEVANT PAGE FROM THE URL
  const location = useLocation();
  const pageRef = location.pathname.substring(1).replace(/\/.*/gm, '');

  //Validating the handle and getting the relevant page
  useEffect(() => {
    if(pageRef !== urlHandle){
      (async () => {
          setCurrentPage(await getPage(pageRef))
          setUrlHandle(pageRef)
      })()
    }
  },[setCurrentPage, pageRef, currentPage, urlHandle, setUrlHandle])
  
  //ENABLING ADMIN PRIVILEGES
  const [ isAdmin, setIsAdmin ] = useState(false);
  // useEffect(() => {
  //   console.log('running useEffect 1 about admin')
  //   if (!isAdmin){
  //     const admins = currentPage?.followers?.filter(f => f.role === 'ADMINISTRATOR');
  //     const adminIDs = admins?.map(a => a.id);
  //     if (adminIDs?.includes(user.id)){
  //       setIsAdmin(true)
  //     }
  //   }
  // }, [isAdmin, currentPage, user])

  const WelcomePage = () => {
    return(
      <div>
        <h2>Welcome to {currentPage?.name}</h2>
        <SignInForm />
      </div>
    )
  }

  const SignedInScreen = () => {
    return (
      <div>
      <h1> You are signed in with {user.email}</h1>
      <button onClick={() => {setIsSignedIn(false); setUser(null)}}>Sign Out</button>
      </div>
    )
  }
  
  const routes = [
    // { path: '/', element: <GivingForm /> } ,
    { path: '/', element: isSignedIn? <SignedInScreen /> : <SignInPage /> } ,
    { path: 'register', element: <SignUpForm /> } ,
    { path: ':handle/watch', element: currentPage ? <WatchPage /> : <ErrorPage /> } ,   
    { 
      path: ':handle', 
      element: currentPage ? isSignedIn? <Dashboard />: <WelcomePage /> : <ErrorPage /> , //if handle doesn't exist, return error page, otherwise check if logged in
      children: [
            // { path: '', element: user.email? <Dashboard />: <WelcomePage /> },
            { path: 'giving-records', element: isSignedIn? <GivingRecords/>: <SignInForm /> },
            { path: 'conversations', element: <ComingSoon /> }, //user.email?<Conversations />: <SignInForm /> },
            { path: 'notifications', element: <ComingSoon /> }, //user.email?<Notifications/>: <SignInForm /> },
            { path: 'testimonies', element: <ComingSoon /> }, //user.email?<Testimonies/>: <SignInForm /> },
            { path: 'notes', element: <ComingSoon /> }, //user.email?<Notes/>: <SignInForm /> },
            { path: 'events', element: <Events /> },
            { path: 'news-feed', element: <ComingSoon /> }, //user.email?<NewsFeed/>: <SignInForm /> },
            { path: 'profile', element: <Profile/> },
            { path: 'church', element: <Church /> },
            { path: 'signin', element: <SignInForm /> },
            { path: 'signup', element: <SignUpForm /> },
            { path: 'reports', element: <Reports /> },
            { path: 'members', element: <MemberDatabase /> },
            { path: 'admins', element: <Admins /> },
            { path: 'pages', element: user?.type === 'SUPERUSER'? <Pages />: 'hello amen' },
            { path: 'create-page', element: user?.type === 'SUPERUSER'? <NewPage/>: <ErrorPage /> },
            { path: 'page-profile', element:  isAdmin ? <Pages />: <ErrorPage /> },
            { path: 'admin', element: <AdminPage /> },
      ],
    },
    { path: '*', element: <ErrorPage /> },
  ]


  return useRoutes(routes);

}

