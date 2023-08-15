import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useMyStore } from "../store";

export const SignInForm = () => {

  const setUser = useMyStore((store) => store.setUser)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred.user)
      setUser(userCred.user)
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <div style={{width: '400px', display: 'flex', flexDirection: 'column'}}>
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