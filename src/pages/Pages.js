import React from 'react'
import { useMyStore } from '../store';

function Pages() {

    const { user } = useMyStore();

    const style = {
        height: '450px',
        border: '2px solid',
        width: '470px'
      }
    
      const arr = new Array(11).fill(1);
    
      return (
        <div>
          <div>Pages</div>
          <div style={{height: '95vh', overflowY:'auto'}}>
            {user?.type === 'SUPERUSER'?
            <a href='create-page'>
                <div style={{...style, padding: '5px'}}>
                    <h3> + Create a Page </h3>
                </div>
            </a>
            : <></>
            }     
            {arr.map((e,i) => {
              return (
                <div style={style} key={i}>
                  <p>Page {e+i}</p>
                </div>
              )})
            }
            
          </div>
        </div>
      )
}

export default Pages