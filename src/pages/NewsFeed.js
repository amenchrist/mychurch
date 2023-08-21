import React from 'react'

function NewsFeed() {
  const style = {
    height: '450px',
    border: '2px solid',
    width: '470px',
  }

  const arr = new Array(11).fill(1);

  return (
    <div>
      <div>News Feed</div>
      <div style={{height: '95vh', overflowY:'auto'}}>
        {arr.map((e,i) => {
          return (
            <div style={style} key={i}>
              <p>Post {e+i}</p>
            </div>
          )})
        }        
      </div>
    </div>
  )
}

export default NewsFeed