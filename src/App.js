import './App.css';
import { SignInForm } from './components/SignInForm';
import Sidebar from './components/timeline/Sidebar';
import Router from './routes';
import { useMyStore } from './store';
import ThemeProvider from './theme';


function App() {

  const user = useMyStore(store => store.user)

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

