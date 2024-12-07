import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import { useMyStore } from '../store';

function ErrorPage() {
  const { loading } = useMyStore();

  return (
    <>
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        {
          loading? <SyncLoader color={'black'} loading={loading} size={10} aria-label="Loading Spinner" data-testid="loader" /> 
        : 
          <div>
            <h2>Sorry, this page isn't available.</h2>
            <p>The link you followed may be broken, or the page may have been removed</p>
          </div>
        }
      </div>
    </>
  )
}

export default ErrorPage