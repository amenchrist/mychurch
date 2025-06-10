import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useMyStore } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  useNavigate } from "react-router-dom";
import User  from '../classes/User';
import { createPage, createUserProfile } from '../dbQueryFunctions';

const StateContext = createContext();

export const RegistrationPageContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    console.log(`Registration Page Context provider Renders = ${rendered.current}`)
  }, []);

  const navigate = useNavigate();

  const { setUser, currentPage, setIsSignedIn } = useMyStore();
  const [ error, setError ] = useState(false);

  const [ stage, setStage ] = useState(1);

  //New User Authentication states
  // const [ credentials, setCredentials ] = useState({})
  const [ userDetails, setUserDetails ] = useState({})
  const { email, phoneNumber, password, church } = userDetails;
  
  const [ address, setAddress ] = useState({})
  const [ bioData, setBioData ] = useState({}) //{ title, firstName, middleName, lastName, gender, dateOfBirth, maritalStatus, nationality }
  const contactInfo = { email, phoneNumber, address }


  let userCred = null;
  let userAuthCreated = false
  let userProfileCreated = false

  const newUser = {
    id: `user_${uuidv4()}`,
    bioData,
    contactInfo,
    type: 'USER',
    church,
    // primaryPage: handle
  }

  const offlineSignUp = () => {
    console.log(newUser)
    setUser(newUser)
    setIsSignedIn(true)
    navigate('/create-page')
  }

  const signUp = async () => {
    try {
      userCred = await createUserWithEmailAndPassword(auth, email, password);
      
      if(userCred){
        userAuthCreated = true
      }
      
    } catch (err) {
      setError(true)
      console.log('Error Creating New user auth')
      console.error(err);
    }

    try {
      if (userAuthCreated){
        userProfileCreated = await createUserProfile(newUser);
      }
    } catch (err){
      console.log('Error Creating New user profile')
      console.error(err);
    }

    try {
      if(userProfileCreated){
        const { firstName, lastName } = bioData
        const newPage = {
          id: uuidv4(),
          type: 'PERSON',
          name: `${firstName} ${lastName}`, 
          // handle, 
          bio: '', contactInfo,
          followers: [],
          events: [],
          posts: [],
          bankDetails: [],
          transactions: [],
          chats: [],
          creatorID: newUser.id,
          creationTimestamp: new Date().getTime()
        }
  
        const pageCreated = await createPage(newPage);
        if (pageCreated){
          setUser({...userCred.user, ...new User(newUser)});
          // navigate(`/${handle}`);
        }
      }
    } catch (err) {
        console.log('Error Creating New page')
        console.error(err);
    }
  };
  
  const contextStateVars = {
    bioData, setBioData, stage, setStage, address, setAddress, signUp, userDetails, setUserDetails, offlineSignUp
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useRegistrationPageContext = () => useContext(StateContext);