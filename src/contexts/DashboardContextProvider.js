import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useMyStore } from '../store';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import dayjs from 'dayjs';
import Event from '../classes/Event';

const StateContext = createContext();

export const DashboardContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    // console.log(`Dashboard Context provider Renders = ${rendered.current}`)
  }, []);

  const { currentPage } = useMyStore();
  const [ events, setEvents ] = useState([]);
  const [ event, setEvent ] = useState([]);
  const [ showEventReport, setShowEventReport ] = useState(false);
  
  const contextStateVars = {

    showEventReport, setShowEventReport, events, event, setEvent, setEvents
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useDashboardContext = () => useContext(StateContext);