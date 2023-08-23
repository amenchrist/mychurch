import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useMyStore } from "../store";
import { collection, setDoc, doc } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";
import { User } from "../classes";

export const SignUpForm = () => {

  const { setUser } = useMyStore();
  const userProfilesRef = collection(db, 'userProfiles');

  const nUser = new User();
  console.log(nUser);

  //New User Authentication states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //New User Profile States
  const [ title, setTitle ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ role, setRole ] = useState("SUBSCRIBER");
  const [ disabled, setDisabled ] = useState(true);

  const newUser = { title, firstName, lastName, role }

  const navigate = useNavigate()

  const signUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await addUser(newUser);
      setUser({...userCred.user, ...newUser});
      console.log('New User Added')
      navigate('/');
    } catch (err) {
      console.error(err);
    }

  };

  const addUser = async () => {

    try {
      await setDoc(doc(userProfilesRef, email), newUser);
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
        <input required placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
        <input required placeholder="Role" value={role} disabled={disabled} onChange={(e) => setRole(e.target.value)} onClick={() => setDisabled(false)}/>
      </div>
      <button onClick={signUp}> Sign Up</button>

      <a href='/'>I'm Registered</a>


    </div>
  );
}