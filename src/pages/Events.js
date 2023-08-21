import React from 'react'

function Events() {
  const style = {
    height: '450px',
    border: '2px solid',
    width: '470px'
  }

  const arr = new Array(11).fill(1);

  return (
    <div>
      <div>Events</div>
      <div style={{height: '95vh', overflowY:'auto'}}>
        <div style={{...style, padding: '5px'}}>
          <h3> + New </h3>
        </div>
        {arr.map((e,i) => {
          return (
            <div style={style} key={i}>
              <p>Event {e+i}</p>
            </div>
          )})
        }        
      </div>
    </div>
  )
}

export default Events