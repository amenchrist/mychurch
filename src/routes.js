import {  useRoutes, Navigate } from 'react-router-dom';
// import DashboardLayout from './components/adminDashboard/DashboardLayout';
// import MemberDashboardLayout from './components/memberDashboard/MemberDashboardLayout';
// import { Offerings, Tithes, Partnerships, SpecialSeeds, OtherGiving, GivingSummary } from './pages/@memberDashboard';
// import { ServiceSummary, Attendees, FirstTimers, Absentees, GivingRecord, Members, YearOverview } from './pages/@adminDashboard';
// import WatchPage from './pages/@watchPage/WatchPage';
import SignInSide from './pages/SignIn';
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
import AdminPage from './pages/AdminPage';
import { useMyStore } from './store';
import { SignInForm } from './components/SignInForm';
import Reports from './pages/Reports';
import MemberDatabase from './pages/MemberDatabase';
import Admins from './pages/Admins';

export default function Router() {

  const { user } = useMyStore()
  
  const routes = [
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
    { path: 'admin', element: user.email?<AdminPage />: <SignInForm /> } 
  ];


  return useRoutes(routes);

}

