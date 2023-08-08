import './App.css';
import { Auth } from './components/Auth';
import { ContactInfo } from './classes';

function App() {

  const data = {
    email: "anEmail@email.com",
    phoneNumber: "023897387",
    address: {
      street: "Lord Lugard Street"
    },
    id: 2
  }

  const con = new ContactInfo(data)

  console.log(con)
  return (
    <div className="App">
      <Auth />
 
    </div>
  );
}

export default App;
