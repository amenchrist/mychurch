import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useMyStore } from '../store';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import dayjs from 'dayjs';

const StateContext = createContext();

export const DashboardContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    // console.log(`Dashboard Context provider Renders = ${rendered.current}`)
  }, []);

  const { user, setUser, currentPage } = useMyStore();
//   console.log(useMyStore())

  const [ events, setEvents ] = useState([]);
  const [ event, setEvent ] = useState([]);
  const [ showEventReport, setShowEventReport ] = useState(false);


  useEffect(() => {

    const getEvents = async () => {

      try{
        const querySnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events`)); 
        const newEvents = [];
        querySnapshot.forEach( async (docSnap) => {
          const ev = docSnap.data()
          if(ev.hasFinalAttendance){
            console.log('Has final attendance')
            newEvents.push(ev) 
            newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
            setEvents([...newEvents])
          } else {
            //Calculate total attendance
            let total = 0
            try {
              const attendanceSnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events/${ev.id}/attendanceRecords`));
              const attendanceRecords = [];
              attendanceSnapshot.forEach((rec) => {
                attendanceRecords.push(rec.data())
              });
              total = attendanceRecords.reduce((accumulator, curVal) => accumulator + parseInt(curVal.attendance), 0);
          
            } catch (err) {
              console.log('Error fetching Event Attendance')
              console.log(err)
            }
            if(ev.hasStarted){
              //update the event
              try {
                  const update = { totalAttendance: total, hasFinalAttendance: ev.hasEnded }
                  await updateDoc(doc(db, `pages/${currentPage.handle}/events`, ev.id), update);       
              } catch (err) {
                  console.log('Error updating final event attendance');
                  console.log(err);
              }
            }

            newEvents.push({...ev, totalAttendance: total});
            newEvents.sort((e1,e2) => dayjs(e1.date) - dayjs(e2.date))
            setEvents([...newEvents]);
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