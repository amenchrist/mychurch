import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useMyStore } from "../store";

export const SignUpForm = () => {

  const setUser = useMyStore((store) => store.setUser)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCred.user)
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div style={{width: '400px', display: 'flex', flexDirection: 'column', height: '400px'}}>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}> Sign Up</button>

    </div>
  );
};