import { useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Router from './routes';
import { useMyStore } from './store';
import ThemeProvider from './theme';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from './config/firebase';
import { Page } from './classes';



function App() {

  const {user, setCurrentPage, currentPage } = useMyStore()
  const location = useLocation();
  // const parent = window.parent.location.hostname

  


  // console.log(currentPage)
  // console.log(typeof console.log)

  // const { setUser } = useMyStore()
  
  // useEffect(() => {
  //   const mockUser = {
  //     email: 'amen@amen.com',
  //     title: 'Bro',
  //     firstName: 'Amen',
  //     lastName: 'Christ',
  //     role: 'ADMINISTRATOR'
  //   }
  //   setUser(mockUser)
  // }, [setUser])

  console.log(user)

  const Home = () => {
    return (
      <div style={{height: '100vh', display: 'flex', justifyContent: 'center'}}>
            <Sidebar />
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

