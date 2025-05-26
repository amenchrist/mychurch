import { doc, getDoc, setDoc } from "firebase/firestore";
import { Page } from './classes';
import { db } from './config/firebase';
import User  from "./classes/User";

export const getPage = async (handle) => {

  // console.log('running get page');
  try {
    const docRef = doc(db, 'pages', handle)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      // console.log('page found')
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
    const docRef = doc(db, 'event', id);
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

export const getUser = async (email) => {
  //Used to load profile after successful auth
  try {
    const docRef = doc(db, 'userProfiles', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      const user = new User({...docSnap.data()})
      return user;
      // setUser(user); 
      // setIsSignedIn(true);
      // navigate('/pages')
    } else {
      console.log('User Profile not found');
      return false
    }
  } catch (err) {
    console.log(err);
    return false
  }
}

export const createPage = async (newPage) => {
  console.log('Creating new page')
  try{
    await setDoc(doc(db, 'pages', newPage.handle), newPage);
    return true
  }catch (e) {
    console.log("Error Creating Page");
    return false
  }
}

export const createUserProfile = async (newUser) => {
  try {
    await setDoc(doc(db, 'userProfiles', newUser.contactInfo.email), newUser);
    return true
  } catch (err) {
    console.log('Error adding new user profile')
    console.log(err);
    return false
  }
}

export const createEvent = async (event, page) => {
  try {
    await setDoc(doc(db, `pages/${page.handle}/events`, event.id), {...event});
    return { success: true }
  } catch (err) {
    console.log('Error creating event')
    console.log(err);
    return { success: false }
  }
}

export const checkEmail = (email) => {
    // console.log('checking if email is registered')
    // if(!valid && email !=='' ) return
    (async () => {
      try {
        const docRef = doc(db, 'userProfiles', email)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          // console.log("Email exists");
          return true
        } else {
          return false

        }
      } catch (err) {
        console.log("Error validating email");
        // console.log(err)
      }
    })()
  }