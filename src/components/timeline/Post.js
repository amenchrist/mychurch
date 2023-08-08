import React from 'react'

function Post() {
  return (
    <div style={{height: '400px', border: '2px solid red', display: 'flex', flexDirection: 'column'}}>
        <img alt='post' height={'70%'}/>
        <div style={{display: 'flex', justifyContent: 'space-between',}}>
          <div className='metadata'>
              <div style={{display: 'flex'}}>
                  <img alt='' style={{border: '2px solid', borderRadius:'100%', height: '20px', width: '20px'}}/>
                  <p>Username</p>
              </div>
              <p>Caption</p>
          </div>
          <div>
              <img alt='Like' />
              <img alt='Comments' />
              <img alt='Share' />
              <img alt='Options' />
          </div>
        </div>
    </div>
  )
}

export default Post