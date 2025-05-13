import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useMyStore } from '../store';
import dayjs from 'dayjs';
import Page from '../classes/Page';
import Event from '../classes/Event';
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

  const [ attendeeEmail, setAttendeeEmail ] = useState(user?.contactInfo?.email || '');
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

    const [ events, setEvents ] = useState([])
    const [ pastEvents, setPastEvents ] = useState([])
    const {  event, setEvent, setNextEvent } = useMyStore();
    const currentPage = useMyStore(store => new Page(store.currentPage))
    const nextEvent = useMyStore(store => new Event(store.nextEvent))
    
    

    useEffect(() => {
      const getEvents = async () => {
        // console.log('searching for all events')
        try {
          const events = await currentPage.getEvents()
          if(events){
            const relevantEvents = events.filter((e)=> (e.hasStarted && !e.hasEnded) || e.getTimestamp() >= new Date().getTime()).sort((e1,e2) => dayjs(e1.getTimestamp()) - dayjs(e2.getTimestamp()));
            const endedEvents = events.filter( e => e.hasEnded === true && e.archiveURL !== ''  && e.archiveURL !== null ).sort((e1,e2) => dayjs(e2.endTimestamp) - dayjs(e1.endTimestamp));
            console.log(endedEvents)
            setPastEvents(endedEvents)
          
            const ongoingEvent = relevantEvents.find(e => e.hasStarted && e.hasEnded === false);
            if (ongoingEvent === undefined && event !== null){
              console.log("there's no ongoing event")
              setEvent(null)
            }

            if(nextEvent && nextEvent?.id !== relevantEvents[0]?.id ){
              if(relevantEvents[0] === undefined){
                setNextEvent(null)
              }else {
                setNextEvent(relevantEvents[0])
              }
            }
            if(nextEvent === null ){
              setNextEvent(relevantEvents[0])
            }
            
            setEvents([...relevantEvents])

            setEvents(relevantEvents)
          }
        }catch (err) {
          console.log("Error getting Events by date")
          console.log(err)
        } 
      }
      getEvents();
  
    }, [])
    //[currentPage, setEvent, setNextEvent, nextEvent, event]

    const ongoingEvent = events.find(e => e.hasStarted && e.hasEnded === false);
    useEffect(() => {
      console.log('Setting event to ongoing event')
      if(ongoingEvent !== undefined && ongoingEvent?.id !== event?.id){
        setEvent(ongoingEvent);
      } 
    }, [ongoingEvent, event, setEvent]);

    //Automatically Start Event 
    useEffect(() => {
      console.log('auto starting event')
      const today = dayjs(dayjs().format('YYYY-MM-DD')).toDate().toString()
      const startEvent = async () => {
        const update = { hasStarted: true, startTimestamp: new Date().getTime() }
        try {
          const updatedEvent = await nextEvent.update(update)
          if(updatedEvent){
            setEvent(updatedEvent);
            console.log('Event Started Automatically')
          }
        } catch (err) {
          console.log('Error updating event')
          console.log(err);
        }
      }
      if(nextEvent && nextEvent.hasStarted === false && nextEvent.date === today && nextEvent.id !== ongoingEvent?.id){
        startEvent()
        
      } 
    }, [nextEvent, setEvent]);

    //Automatically End Event
    useEffect(() => {
      const endEvent = async () => {
        try {
          const updatedEvent = await event.end()
          if(updatedEvent){
            setEvent(updatedEvent);
          }
        } catch (err) {
          console.log('Error updating event')
          console.log(err);
        }
      }
      const oneDay = 86400000;
      const now = new Date().getTime()
      if(event && event.hasStarted && now - event.startTimestamp >= oneDay && !event.hasEnded ){
        endEvent()
      } 
    }, [event, setEvent]);
 
  
  const contextStateVars = {

    attendeeEmail, setAttendeeEmail, emailCaptured, setEmailCaptured, attendanceCaptured, setAttendanceCaptured, isRegistered, setIsRegistered,
    isAdmin, setIsAdmin, attendanceSubmitted, setAttendanceSubmitted, pastEvents,
    user, setUser, blankUser, userIsParticipant, setUserIsParticipant, events, setEvents, 

  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useWatchPageContext = () => useContext(StateContext);