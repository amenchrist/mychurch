// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3NQQD7coOKdEIP4glo3bo8ZW4GeL-AlU",
  authDomain: "mychurch-f99db.firebaseapp.com",
  projectId: "mychurch-f99db",
  storageBucket: "mychurch-f99db.appspot.com",
  messagingSenderId: "602235298584",
  appId: "1:602235298584:web:4de1370bae22159579746d",
  measurementId: "G-NGKTBN6Y19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);