import React, { useEffect } from 'react'

function LiveChat() {
  

  useEffect(() => {

    //set iframe source
    let chatIframe = document.getElementById('chatFrame')
    chatIframe.src = "//v.24liveblog.com/chat/?id=3147496917983850924"


    const script = document.createElement('script');
    script.src = "https://v.24liveblog.com/iframe.js";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);


  return (
    <>
    <div style={{height: '100%'}}>
      <iframe id='chatFrame' title="ChatBox" name="lb24" frameBorder="0" height="100%" loading="lazy" width="100%" className="lb24-iframe"  ></iframe>
      {/* <script src="https://v.24liveblog.com/iframe.js"></script>    */}
    </div>
    </>
  )
}

export default LiveChat