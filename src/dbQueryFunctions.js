import { doc, getDoc } from "firebase/firestore";
import { Page } from './classes';
import { db } from './config/firebase';

export const getPage = async (handle) => {

    console.log('running get page')

    try {
      const docRef = doc(db, 'pages', handle)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        console.log('page found')
        return new Page(docSnap.data());
      } else {
        console.log('Page not found');
        return null
      }
    } catch (err) {
      console.log(err);
      return null
    }
  }