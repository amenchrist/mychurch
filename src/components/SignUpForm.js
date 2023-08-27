import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useMyStore } from "../store";
import { collection, setDoc, doc } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";
import { Address, BioData, ContactInfo, User } from "../classes";
import { v4 as uuidv4 } from 'uuid';
import { userConverter } from "../firebaseConverters";


export const SignUpForm = () => {

  const { setUser, currentPage } = useMyStore();
  // const userProfilesRef = collection(db, 'userProfiles');

  //New User Authentication states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //New User Profile States
  const [ title, setTitle ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ role, setRole ] = useState("SUBSCRIBER");
  const [ disabled, setDisabled ] = useState(true);

  const [ middleName, setMiddleName ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ dateOfBirth, setDateOfBirth ] = useState('');
  const [ maritalStatus, setMaritalStatus ] = useState('');
  const [ nationality, setNationality ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ houseNameOrNumber, setHouseNameOrNumber ] = useState('');  
  const [ street, setStreet ] = useState('');  
  const [ cityOrTown, setCityOrTown ] = useState('');  
  const [ state, setState ] = useState('');  
  const [ county, setCounty ] = useState('');  
  const [ country, setCountry ] = useState('');  
  const [ postOrZipCode, setPostOrZipCode ] = useState('');  

  
  // const address = new Address({ houseNameOrNumber, street, cityOrTown, state, county, country, postOrZipCode })
  const address = { houseNameOrNumber, street, cityOrTown, state, county, country, postOrZipCode }

  // const bioData = new BioData({ title, firstName, middleName, lastName, gender, dateOfBirth, maritalStatus, nationality })
  const bioData = { title, firstName, middleName, lastName, gender, dateOfBirth, maritalStatus, nationality }

  // const contactInfo = new ContactInfo({ email, phoneNumber, address })
  const contactInfo = { email, phoneNumber, address }

  // const newUser = { title, firstName, lastName, role }

  const newUser = {
    id: uuidv4(),
    bioData,
    contactInfo,
    pages: [currentPage?.id],
    likedPosts: [],
    savedPosts: [],
    events: [],
    notes: [],
    reviews: [],
    type: 'USER'
}

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await addUser(newUser);
      const nUser = new User(newUser)
      setUser({...userCred.user, ...nUser});
      console.log('New User Added')
      navigate('/');
    } catch (err) {
      console.error(err);
    }

  };

  const addUser = async () => {

    try {
      await setDoc(doc(db, 'userProfiles', email), newUser);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div style={{width: '400px', display: 'flex', flexDirection: 'column', height: '400px'}}>
      <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <div style={{width: '400px', display: 'flex', flexDirection: 'column'}}>
        <input required placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />      
        <input required placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
        <input required placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)} />
        <input required placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
        <input required placeholder="Role" value={role} disabled={disabled} onChange={(e) => setRole(e.target.value)} onClick={() => setDisabled(false)}/>
        <input required placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
        <input required placeholder="Date of Birth" onChange={(e) => setDateOfBirth(e.target.value)} />
        <input required placeholder="Marital Status" onChange={(e) => setMaritalStatus(e.target.value)} />
        <input required placeholder="Nationality" onChange={(e) => setNationality(e.target.value)} />

        <p>Contact Info</p>
        <input required placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
        <input required placeholder="House Name of Number" onChange={(e) => setHouseNameOrNumber(e.target.value)} />
        <input required placeholder="Street" onChange={(e) => setStreet(e.target.value)} />
        <input required placeholder="City/Town" onChange={(e) => setCityOrTown(e.target.value)} />
        <input required placeholder="State" onChange={(e) => setState(e.target.value)} />
        <input required placeholder="County" onChange={(e) => setCounty(e.target.value)} />
        <input required placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
        <input required placeholder="Postcode / Zip code" onChange={(e) => setPostOrZipCode(e.target.value)} />
      </div>
      <button onClick={signUp}> Sign Up</button>

      <a href='/'>I'm Registered</a>


    </div>
  );
}