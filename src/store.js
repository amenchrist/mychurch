import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from "./config/firebase";
import dayjs from 'dayjs';

function store(set) {

  const getEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, `pages/cebarking/events`)); 
      const newEvents = []

      querySnapshot.forEach((doc) => {
        const curEvent = doc.data()
        newEvents.push(curEvent)

        // if(dayjs(curEvent.date).toDate().getTime() >= new Date().getTime() || curEvent.isOnNow){
        //     newEvents.push(curEvent)
        // }
      });
      newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
      // if(nextEvent && nextEvent?.id !== newEvents[0].id ){
      //     setNextEvent(newEvents[0])
      // }
      return [...newEvents]

    } catch (err) {
      console.log('Error retrieving scheduled events');
      console.log(err)
      return []
    }
  } 

  const events = getEvents()

  return {
      user: null,
      setUser: (newUser) => set(() => ({user: newUser})),
      adminMode: false,
      toggleAdminMode: (value) => set(() => ({adminMode: value})),
      currentPage: null,
      setCurrentPage: (newPage) => set(() => ({currentPage: newPage})),
      urlHandle: '',
      setUrlHandle: (handle) => set(() => ({urlHandle: handle})),
      isSignedIn: false,
      setIsSignedIn: (value) => set(() => ({isSignedIn: value})),
      event: null,
      setEvent: (newEvent) => set(() => ({event: newEvent})),
      nextEvent: null,
      setNextEvent: (newEvent) => set(() => ({nextEvent: newEvent})),
      events: [],
      // setEvents: async () => {
      //   try {
      //     const querySnapshot = await getDocs(collection(db, `pages/cebarking/events`)); 
      //     const newEvents = []
    
      //     querySnapshot.forEach((doc) => {
      //       const curEvent = doc.data()
      //       newEvents.push(curEvent)
    
      //       // if(dayjs(curEvent.date).toDate().getTime() >= new Date().getTime() || curEvent.isOnNow){
      //       //     newEvents.push(curEvent)
      //       // }
      //     });
      //     newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
      //     // if(nextEvent && nextEvent?.id !== newEvents[0].id ){
      //     //     setNextEvent(newEvents[0])
      //     // }
      //     set(() => ({events: [...newEvents]}))
    
      //   } catch (err) {
      //     console.log('Error retrieving scheduled events');
      //     console.log(err)
      //     return []
      //   }
      // } ,
      setEvents: (events) => set(() => ({events: events}))
  }

}

export const useMyStore = create(persist(store, {name: 'store'}));