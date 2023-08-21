import React from 'react'

function Notes() {
  const style = {
    width: '600px',
    height: '300px',
    border: '2px solid'
  }

  return (
    <div>
      <div style={{display:'flex', height:'95vh', width: 900, justifyContent: 'center'}}>
        <div style={{...style, width: 300, height: '100%'}}>Notes List</div>
        <div style={{ ...style, height: '100%'}}>Selected Note</div>
      </div>
    </div>
  )
}

export default Notes