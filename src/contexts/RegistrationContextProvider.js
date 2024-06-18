import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useMyStore } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  useNavigate } from "react-router-dom";
import { User } from '../classes';
import { createPage, createUserProfile } from '../dbQueryFunctions';

const StateContext = createContext();

export const RegistrationPageContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    console.log(`Registration Page Context provider Renders = ${rendered.current}`)
  }, []);

  const { setUser, currentPage } = useMyStore();
  const [ error, setError ] = useState(false);

  const [ stage, setStage ] = useState(1);

  //New User Authentication states
  const [ credentials, setCredentials ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('');

  const { email, password, handle } = credentials;
  
  const [ address, setAddress ] = useState({})
  const [ bioData, setBioData ] = useState({}) //{ title, firstName, middleName, lastName, gender, dateOfBirth, maritalStatus, nationality }
  const contactInfo = { email, phoneNumber, address }

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      const newUser = {
        id: `user_${uuidv4()}`,
        bioData,
        contactInfo,
        likedPosts: [],
        savedPosts: [],
        events: [],
        notes: [],
        reviews: [],
        type: 'USER',
        primaryPage: handle
      }
      const userCreated = await createUserProfile(newUser);

      if (userCreated){
        const { firstName, lastName } = bioData
        const newPage = {
          id: uuidv4(),
          type: 'PERSON',
          name: `${firstName} ${lastName}`, 
          handle, bio: '', contactInfo,
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
          navigate(`/${handle}`);
        }
      }
    } catch (err) {
      setError(true)
      console.log('Error Creating New user')
      console.error(err);
    }
  };
  
  const contextStateVars = {
    bioData, setBioData, stage, setStage, address, setAddress, signUp, password, setCredentials 
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useRegistrationPageContext = () => useContext(StateContext);