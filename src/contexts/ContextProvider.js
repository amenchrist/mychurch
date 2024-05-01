import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
// import { getOrgDetails } from '../functions';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    console.log(`Context provider Renders = ${rendered.current}`)
  }, []);  

  //Get info on parent website
//   const orgDetails = useMemo(() => getOrgDetails(), []); 

  //Set app default values
  const [serverIsOnline, setServerIsOnline] = useState(false);
  // const serverIsOnline = useRef(false)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [toggleMenuIcon, setToggleMenuIcon] = useState(false);
  const [awaitingServerResponse, setAwaitingServerResponse] = useState(false)
  const [authRequested, setAuthRequested] = useState(false)

  //Set user defaults
  const [currentMember, setCurrentMember] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [geolocation, setGeolocation] = useState({IPv4: 'IP UNAVAILABLE'});
  const [isAdmin, setIsAdmin] = useState(false);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

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

  const [user, setUser] = useState(() => {
    const request = {
      action: "GET",
      key: 'myChurchUser'
    }
    window.parent.postMessage(request, "*");
    return blankUser
    
  })

  // useEffect(() => {

  //   sessionStorage.setItem('user', JSON.stringify(user))
  //   const request = {
  //     action: "SET",
  //     key: 'myChurchUser',
  //     payload: {...user, attendanceSubmitted: false}
  //   }
  //   window.parent.postMessage(request, "*");

  // }, [user])

  // useEffect(() => {

  //   window.onmessage = function(e) {

  //     const allowedParents = [ 'http://localhost:5000', 'https://christembassybarking.org', 'https://ceilford.org' ]

  //       if (allowedParents.includes(e.origin)) {

  //         switch(e.data.type){
  //           case 'GET_RESPONSE':
  //             if(!e.data.payload) {
  //               return
  //             } else {
  //               console.log("parent response was ", e.data.payload)
  //               setUser(e.data.payload)
  //               return
  //             }
  //           case 'SET_RESPONSE':
  //             return
  //           default:
  //         }
  //       }
  //   };

  // }, [])

  //Check if server is online

  

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

  //Set church dashboard defaults
  const [dates, setDates] = useState([]);
  const [serviceDate, setServiceDate] = useState('');
  const [serviceDateObjects, setServiceDateObjects] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  //Set member dashboard defaults  
  const [isNewSite, setIsNewSite] = useState(true); 


  //get ip and location info
  // useEffect(() => {

  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   if(geolocation.IPv4 === undefined){

  //     console.log("Getting Geolocation")

  //     const options = {
  //       signal: signal,
  //       method: 'GET',
  //       mode: 'no-cors', //no-cors
  //       referrerPolicy: 'strict-origin-when-cross-origin',//no-referrer
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     }

  //     fetch(`https://geolocation-db.com/json/`, options).then(res => res.json()).then( data => {
  //       console.log(data)
  //       console.log("Geolocation received")
  //       setGeolocation(data)
  //     }).catch(err => {
  //       console.log("Geolocation failed")
  //       console.log(err)
  //       // setGeolocation({IPv4: 'IP UNAVAILABLE'})
  //     })
      
  //   }

  //   return () => {
  //     //cancel the request before the component unmounts
  //     controller.abort();
  //   }
  // }, [ geolocation ])

  

  // useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(user))
  // }, [user]);

  //EXPORT

 
  
  const contextStateVars = {

    attendanceRecords, setAttendanceRecords,
    serviceDate, setServiceDate,
    serviceDateObjects, setServiceDateObjects, geolocation, 
    dates, setDates,
    isSignedIn, setIsSignedIn, isRegistered, setIsRegistered, currentMember, setCurrentMember,
    isNewSite, setIsNewSite, isAdmin, setIsAdmin, attendanceSubmitted, setAttendanceSubmitted,
    awaitingServerResponse, setAwaitingServerResponse, authRequested, setAuthRequested,
    isMobileNavOpen, setMobileNavOpen, toggleMenuIcon, setToggleMenuIcon,
    user, setUser, serverIsOnline, blankUser

  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);