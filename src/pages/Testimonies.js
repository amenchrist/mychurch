import React from 'react'

function Testimonies() {
  const style = {
    width: '300px',
    height: '300px',
    border: '2px solid'
  }

  const arr = new Array(21).fill(1);

  return (
    <div >
      <div style={{display: 'flex', flexWrap: 'wrap', margin: 'auto', height: '95vh', width: '950px', overflowY: 'auto', padding: '15px'}}>
        <div style={{...style, padding: '5px'}}>
          <h3> + New </h3>
        </div>
        {arr.map((e,i) => {
          return (
            <div style={{...style, padding: '5px'}} key={i}>
              <p>Thumbnail {e +i}</p>
              <p>Testimony title {e +i}</p>
            </div>
          )
          } )
        }        
      </div>
    </div>
  )
}

export default Testimonies