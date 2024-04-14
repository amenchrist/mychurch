import { doc, getDoc } from "firebase/firestore";
import { Page } from './classes';
import { db } from './config/firebase';

export const getPage = async (handle) => {

    console.log('running get page');
    try {
     const docRef = doc(db, 'pages', handle)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        console.log('page found')
        return docSnap.data();
      } else {
        console.log('Page not found');
        return null
      }
    } catch (err) {
      console.log(err);
      return null
    } 
  }

  export const getEvent = async (id) => {

    console.log('running get event');
    try {
     const docRef = doc(db, 'event', id)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        return docSnap.data();
      } else {
        console.log('Event not found');
        return null
      }
    } catch (err) {
      console.log(err);
      return null
    } 
  }