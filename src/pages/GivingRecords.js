import React from 'react'

function GivingRecords() {

  const style = {
    width: '600px',
    height: '300px',
    border: '2px solid'
  }


  return (
    <div>
      <div>GivingRecords</div>
      <div style={style}>
        <p>Giving Trend Line Graph with multiple lines showing different categories</p>
      </div>
      <div style={style}>
        <p>Recent Transactions Table (filterable)</p>
      </div>
    </div>
  )
}

export default GivingRecords