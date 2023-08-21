import React from 'react'
import { useState } from 'react';
import MemberDetails from '../components/MemberDetails';

function MemberDatabase() {

    const style = {
        height: '100px',
        border: '2px solid',
        width: 900
    }

    const [showDetails, setShowDetails] = useState(false);
    const arr = new Array(11).fill(1);

      const MemberList = () => {
        return (
        <div>
          <div>All Members</div>
          <div style={{height: '95vh', overflowY:'auto', width: 900}}>
            {arr.map((e,i) => {
                
              return (
                <div style={style} key={i} onClick={()=> setShowDetails(true)}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15}}>
                        <div>
                            <h3>Mr Amen Christ</h3>
                            <p>Last Active 5 days ago</p>
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
                    {showDetails? <MemberDetails /> : <MemberList />}
                </div>
            </div>
        </>
      )

}

export default MemberDatabase