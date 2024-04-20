import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useMyStore } from '../store';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import dayjs from 'dayjs';

const StateContext = createContext();

export const DashboardContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    console.log(`Dashboard Context provider Renders = ${rendered.current}`)
  }, []);

  const { user, setUser, currentPage } = useMyStore();

  const [ events, setEvents ] = useState([]);
  const [ event, setEvent ] = useState([]);
  const [ showEventReport, setShowEventReport ] = useState(false);


  useEffect(() => {

    const getEvents = async () => {

      try{
        const querySnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events`)); 
        const newEvents = [];
        querySnapshot.forEach( async (doc) => {
          let total = 0
          try {
            const attendanceSnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events/${doc.id}/attendanceRecords`));
            const attendanceRecords = [];
            attendanceSnapshot.forEach((rec) => {
              attendanceRecords.push(rec.data())
            });
            total = attendanceRecords.reduce((accumulator, curVal) => accumulator + parseInt(curVal.attendance), 0)
            newEvents.push({...doc.data(), totalAttendance: total})
            newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
            setEvents([...newEvents])
      
          } catch (err) {
            console.log('Error fetching Event Attendance')
            console.log(err)
          }
        });
      }catch(err) {
        console.log('Error Fetching Past Events')
        console.log(err)
      }     
 
    }

    getEvents();

  }, [])
  
  const contextStateVars = {

    showEventReport, setShowEventReport, events, event, setEvent
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useDashboardContext = () => useContext(StateContext);