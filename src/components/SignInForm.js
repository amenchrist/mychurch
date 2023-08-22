import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useMyStore } from "../store";
import { doc, getDoc } from "firebase/firestore";

export const SignInForm = () => {

  const setUser = useMyStore((store) => store.setUser)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      getUser(userCred.user)
      
    } catch (err) {
      console.error(err);
    }
  };

  // const userProfilesRef = collection(db, 'userProfiles');

  const getUser = async (userCred) => {

    try {
      const docRef = doc(db, 'userProfiles', userCred.email)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        setUser({...userCred, ...docSnap.data()});
      } else {
        console.log('User Profile not found');
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  return (
    <div style={{width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}> Sign In</button>
      <br />
      <a href='/signup'>I'm new here</a>
    </div>
  );
};