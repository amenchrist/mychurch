import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useMyStore } from '../store';

const StateContext = createContext();

export const DashboardContextProvider = ({ children }) => {

  //Track number of rerenders
  const rendered = useRef(0);
  useEffect(() => {
    rendered.current++
    // console.log(`Dashboard Context provider Renders = ${rendered.current}`)
  }, []);

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