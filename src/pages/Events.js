import React, { useState } from 'react'
import { useMyStore } from '../store';
import Event from '../components/Event';

function Events() {

  const { event, setEvent } = useMyStore();
  const [ newEvent, setNewEvent ] = useState(false);

  const style = {
    height: '100px',
    border: '2px solid',
    maxWidth: '470px',
    width: '90vw',
    marginBottom: '5px'
  }

  const arr = new Array(11).fill(1);

  const EventsList = () => {
    return(
      <>
      <div style={{padding: '15px 0'}}><h2>Events</h2></div>
      <div style={{height: '95vh', overflowY:'auto'}}>
        <div style={{...style, padding: '5px'}} onClick={() => setNewEvent(true)} >
          <h3> + New </h3>
        </div>
        {arr.map((e,i) => {
          return (
            <div style={style} key={i}>
              <p>Event {e+i}</p>
            </div>
          )})
        }        
      </div></>
    )
  }

  return (
    <div>
      { newEvent? <Event setNewEvent={setNewEvent} /> : <EventsList />}
    </div>
  )
}

export default Events