import { useEffect } from 'react';
import './App.css';
import { SignInForm } from './components/SignInForm';
import Sidebar from './components/timeline/Sidebar';
import Router from './routes';
import { useMyStore } from './store';
import ThemeProvider from './theme';


function App() {

  const user = useMyStore(store => store.user)

  const { setUser } = useMyStore()
  
  useEffect(() => {
    const mockUser = {
      email: 'amen@amen.com',
      title: 'Bro',
      firstName: 'Amen',
      lastName: 'Christ',
      role: 'ADMINISTRATOR'
    }
    setUser(mockUser)
  }, [setUser])

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

