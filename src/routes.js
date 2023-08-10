import {  useRoutes, Navigate } from 'react-router-dom';
// import DashboardLayout from './components/adminDashboard/DashboardLayout';
// import MemberDashboardLayout from './components/memberDashboard/MemberDashboardLayout';
// import { Offerings, Tithes, Partnerships, SpecialSeeds, OtherGiving, GivingSummary } from './pages/@memberDashboard';
// import { ServiceSummary, Attendees, FirstTimers, Absentees, GivingRecord, Members, YearOverview } from './pages/@adminDashboard';
// import WatchPage from './pages/@watchPage/WatchPage';
import SignInSide from './pages/SignIn';
import { useStateContext } from './contexts/ContextProvider';
import Home from './pages/Home';
import { auth } from './config/firebase';
import WatchPage from './pages/@watchPage/WatchPage';

export default function Router() {

  const { user, awaitingServerResponse } = useStateContext()
  const routes = [
    {
      path: '/',
      element: user.isSignedIn ? <Home/> : <SignInSide />
    },
    {
      path: '/watch',
      element: <WatchPage />
    },
    
    
  ];


  return useRoutes(routes);

}

