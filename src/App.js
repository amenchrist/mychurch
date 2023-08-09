import './App.css';
import Router from './routes';
import ThemeProvider from './theme';


function App() {

  return (
    <div style={{height: '100vh', overflowY: 'hidden' }}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;

