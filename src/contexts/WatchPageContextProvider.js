import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useMyStore } from '../store';
// import { getOrgDetails } from '../functions';

const StateContext = createContext();

export const WatchPageContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    console.log(`Watch Page Context provider Renders = ${rendered.current}`)
  }, []);

  const { user, setUser, } = useMyStore();

  //Set attendee defaults
  const [ isRegistered, setIsRegistered ] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
	const [ emailCaptured, setEmailCaptured ] = useState(user?.email? true : false);
	const [ userIsParticipant, setUserIsParticipant ] = useState(false)
  const [ attendanceSubmitted, setAttendanceSubmitted ] = useState(false);

  const [ attendeeEmail, setAttendeeEmail ] = useState(user?.email || '');
  const [ attendanceCaptured, setAttendanceCaptured ] = useState(false);
  const [ attendanceRecord, setAttendanceRecord ] = useState({
    church: 'Christ Embassy Barking',
  })


  const blankUser = {
    email: '',
    emailChecked: false,
    isAnAdmin: false,
    isSignedIn: true,
    isRegistered: false,
    phoneExists: false,
    attendanceSubmitted: false,
    attendanceRecords: [],
    avatar: '/static/images/avatars/avatar_6.png',
  }
  

//   const [user, setUser] = useState(() => {
//     const defaultUser = {
//       email: '',
//       isAdmin: false,
//       isSignedIn: false,
//       isRegistered: false,
//       attendanceSubmitted: false,
//       attendanceRecords: [],
//       avatar: '/static/images/avatars/avatar_6.png',
//     }
//     let localData = localStorage.getItem('user');
//     if (localData){
//       localData = JSON.parse(localData)
//       localData = { ...defaultUser, email: localData.email }
//       return localData
//     } else {
//       return defaultUser
//     }
    
// })
 
  
  const contextStateVars = {

    attendeeEmail, setAttendeeEmail, emailCaptured, setEmailCaptured, attendanceCaptured, setAttendanceCaptured, isRegistered, setIsRegistered,
    isAdmin, setIsAdmin, attendanceSubmitted, setAttendanceSubmitted,
    user, setUser, blankUser

  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useWatchPageContext = () => useContext(StateContext);