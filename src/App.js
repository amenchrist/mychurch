import './App.css';
// import Sidebar from './components/Sidebar';
import Router from './routes';
import ThemeProvider from './theme';

function App() {

  // const location = useLocation();
  // const parent = window.parent.location.hostname

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

