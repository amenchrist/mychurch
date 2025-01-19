import React, { useState } from 'react'
import NewPage from '../components/NewPage';
import { useMyStore } from '../store';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

function Pages() {

  const { user } = useMyStore();
  const [ createPageMode, setCreatePageMode ] = useState(false);
  const navigate = useNavigate();

  const style = {
    height: '100px',
    border: '2px solid',
    width: 300
  }

  function PageList() {
    const arr = user.pages

    return (
      <div>
        <div style={{height: '90vh', overflowY:'auto'}}>
          {user?.type === 'SUPERUSER'?
              <div style={{...style, padding: '5px'}} onClick={() => setCreatePageMode(true)} >
                  <h3> + Create a Page </h3>
              </div>
          : <></>
          }
          {arr?.map((handle,i) => {
            return (
              <div style={style} key={i} onClick={() => navigate(`/${handle}`)}>
                <p>{handle}</p>
              </div>
            )})
          }
          
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{height: '5vh',}}>Pages</div>
      {createPageMode? <NewPage setCreatePageMode={setCreatePageMode} /> : <PageList />}
      <div style={{height: '5vh', width: '100%', border: '2px solid', display: 'flex', justifyContent: 'center'}}>
        <BottomNav />
      </div>
    </div>
  )
}

export default Pages