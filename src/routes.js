import {  useRoutes, Navigate } from 'react-router-dom';
// import DashboardLayout from './components/adminDashboard/DashboardLayout';
// import MemberDashboardLayout from './components/memberDashboard/MemberDashboardLayout';
// import { Offerings, Tithes, Partnerships, SpecialSeeds, OtherGiving, GivingSummary } from './pages/@memberDashboard';
// import { ServiceSummary, Attendees, FirstTimers, Absentees, GivingRecord, Members, YearOverview } from './pages/@adminDashboard';
// import WatchPage from './pages/@watchPage/WatchPage';
import SignInSide from './pages/SignIn';
// import { useStateContext } from './contexts/ContextProvider';
import Home from './pages/Home';
import { auth } from './config/firebase';
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
import { SignInForm } from './components/SignInForm';
import { useMyStore } from './store';
import AdminPage from './pages/AdminPage';

export default function Router() {

  // const { user, awaitingServerResponse } = useStateContext()

  const user = useMyStore(store => store.user)
  const routes = [
    {
      element: user.email ? <Home/> : <SignInForm />,
      children: [
        { path: '/', element: <Dashboard/> },
        { path: 'news-feed', element: <NewsFeed/> },
        { path: 'profile', element: <Profile/> },
        { path: 'giving-records', element: <GivingRecords/> },
        { path: 'church', element: <Church /> },
        { path: 'events', element: <Events /> },
        { path: 'notes', element: <Notes/> },
        { path: 'notifications', element: <Notifications/> },
        { path: 'testimonies', element: <Testimonies/> },
        { path: 'watch', element: <WatchLive /> },
        { path: 'conversations', element: <Conversations /> },
        { path: 'signin', element: <SignInForm /> },
      ]
    },
    { path: 'watch', element: <WatchPage /> },
    { path: 'signup', element: <SignUpForm /> },
    { path: 'admin', element: <AdminPage /> },
    
    
  ];


  return useRoutes(routes);

}

