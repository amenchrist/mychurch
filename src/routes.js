import {  useRoutes, Navigate, useLocation, useParams, useNavigate, Outlet } from 'react-router-dom';
import WatchPage from './pages/@watchPage/WatchPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import GivingRecords from './pages/GivingRecords';
import Church from './pages/Church';
import Events from './pages/Events';
import { SignUpForm, SignUpPage } from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import { useMyStore } from './store';
import { SignInForm } from './components/Auth/signInForm/SignInForm';
import Reports from './pages/Reports';
import MemberDatabase from './pages/MemberDatabase';
import Admins from './pages/Admins';
import NewPage from './components/NewPage';
import ErrorPage from './pages/ErrorPage';
import Pages from './pages/Pages';
import { useEffect, useMemo, useState } from 'react';
import Page  from './classes/Page'
import ComingSoon from './pages/ComingSoon';
import { getPage } from './dbQueryFunctions';
import SignInPage from './pages/SignInPage';
import Sidebar from './components/Sidebar';
import PageProfile from './components/PageProfile';
import EventPage from './pages/EventPage';
import { WatchPageContextProvider } from './contexts/WatchPageContextProvider';
import { DashboardContextProvider } from './contexts/DashboardContextProvider';
import { RegistrationPageContextProvider } from './contexts/RegistrationContextProvider';
import Home from './pages/Home';


export default function Router() {

  //IMPORTING RELEVANT VARIABLES
  const { isSignedIn, user, currentPage, setCurrentPage } = useMyStore();
  const { urlHandle, setUrlHandle } = useMyStore();

  const navigate = useNavigate()
  
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
    // console.log('Checking handle')
    if(pageRef !== urlHandle){
      (async () => {
        try{
          const page = await getPage(pageRef)
          if(page){
            setCurrentPage(new Page(page))
            setUrlHandle(page.handle)
          }
        }catch (err) {
          console.log('Error getting page')
        }
        
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
  // }, [isAdmin, currentPage, user])''

  //Force redirect to primary page when visiting root
  useEffect(() => {
    if((isSignedIn && pageRef === "") || (isSignedIn && pageRef === "register")){
      navigate(`/${user.primaryPage}`);
    }
  },[user, pageRef, isSignedIn, navigate])

  const PageContainer = () => {
    return(
      <div>
      <Sidebar />
      <Outlet />
      </div>
    )
  }  

  const routes = [
    { path: '/', element: isSignedIn? <Home /> : <SignInPage /> } , //Form will only show if user is not signed in due to forced redirect setting
    { path: 'pages', element: isSignedIn? <Pages /> : <SignInPage /> } ,
    { path: 'register', element: <RegistrationPageContextProvider ><SignUpPage /></RegistrationPageContextProvider> } , //Form will only show if user is not signed in due to forced redirect setting
    { path: ':handle/watch', element: currentPage?.type === "CHURCH" ? <WatchPageContextProvider ><WatchPage /></WatchPageContextProvider> : <ErrorPage /> } ,   
    { 
      path: ':handle', 
      element: currentPage ? isSignedIn? <PageContainer /> : <SignInPage /> : <ErrorPage /> , //if handle doesn't exist, return error page, otherwise check if logged in
      children: [
        { path: '', element: <DashboardContextProvider ><Dashboard /></DashboardContextProvider> },
        { path: 'giving-records', element: isSignedIn? <GivingRecords/>: <SignInForm /> },
        { path: 'conversations', element: <ComingSoon /> }, //user.email?<Conversations />: <SignInForm /> },
        { path: 'notifications', element: <ComingSoon /> }, //user.email?<Notifications/>: <SignInForm /> },
        { path: 'testimonies', element: <ComingSoon /> }, //user.email?<Testimonies/>: <SignInForm /> },
        { path: 'notes', element: <ComingSoon /> }, //user.email?<Notes/>: <SignInForm /> },
        { path: 'news-feed', element: <ComingSoon /> }, //user.email?<NewsFeed/>: <SignInForm /> },
        { path: 'profile', element: <Profile/> },
        { path: 'church', element: <Church /> },
        { path: 'reports', element: <Reports /> },
        { path: 'members', element: <MemberDatabase /> },
        { path: 'admins', element: <Admins /> },
        { path: 'pages', element: user?.type === 'SUPERUSER'? <Pages />: 'hello amen' },
        { path: 'page-profile', element: <PageProfile /> } ,
        { path: 'create-page', element: user?.type === 'SUPERUSER'? <NewPage/>: <ErrorPage /> },
        { path: 'page-profile', element:  isAdmin ? <Pages />: <ErrorPage /> },
        { path: 'admin', element: <AdminPage /> },
        { 
          path: 'events', 
          children: [
            { path: '', element: <Events />,},
            { path: ':id', element: <EventPage /> }
          ]
        },
      ],
    },
    { path: '*', element: <ErrorPage /> },
  ]

  return useRoutes(routes);

}