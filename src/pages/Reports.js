import React from 'react'
import Report from '../components/Report';
import { useState } from 'react';

function Reports() {
    const style = {
        height: '100px',
        border: '2px solid',
        marginBottom: '5px'
    }
    
      const arr = new Array(11).fill(1);

      const [showDetails, setShowDetails] = useState(false)

      const EventList = () => {
        return (
        <div>
          <div>Reports</div>
          <div style={{height: '95vh', overflowY:'auto', width: 900}}>
            {arr.map((e,i) => {
              return (
                <div style={style} key={i} onClick={()=> setShowDetails(true)}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
                        <div>
                            <h3>Sunday Service</h3>
                            <p>August 20th, 2023</p>
                        </div>
                        <h1>{'>'}</h1>
                    </div>
                </div>
              )})
            }        
          </div>
        </div>  
        )
      }
    
      return (
        <>
            <div >
                <h1 onClick={() => setShowDetails(false)}>{'<'}</h1>
                <div>
                    {showDetails? <Report /> : <EventList />}
                </div>
            </div>
        </>
      )
}

export default Reports