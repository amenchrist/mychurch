import React from 'react'

function FacebookPlayer({link}) {
  return (
    <iframe 
    title='FaceBook Player'
    src={link}
    width="267" 
    height="476" 
     style={{border:'none', overflow: 'hidden'}}
     scrolling="no" frameborder="0" 
     allowfullscreen="true" 
     allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
     allowFullScreen="true"></iframe>

  // <iframe 
  // src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FCEPORTSMOUTH%2Fvideos%2F1200777974768508%2F&show_text=false&width=267&t=0" 
  // width="267" 
  // height="476" 
  // style="border:none;overflow:hidden" 
  // scrolling="no" frameborder="0" 
  // allowfullscreen="true" 
  // allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
  // allowFullScreen="true"></iframe>

  )


}

export default FacebookPlayer