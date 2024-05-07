import React, { useEffect, useState } from 'react'
import VideoJS from './VideoJsPlayer';
import videojs from 'video.js';
import { useStateContext } from '../../contexts/ContextProvider';
import './VideoPlayer.css';
import { useMyStore } from '../../store';
import ReactPlayer from "react-player";


export default function VideoPlayer() {

  const { event, currentPage } = useMyStore();


  // const barkingChurch = "https://vcpout-sf01-altnetro.internetmultimediaonline.org/vcp/av5xgmrwkg/playlist.m3u8"
  // // const customStream = 'https://vcpout-ams01.internetmultimediaonline.org/vcp/GNW2022WPCngykyh/playlist.m3u8';
  // const lsat = "https://c6v6m6p7.stackpathcdn.com/lwsat/lwsatmobile/playlist.m3u8"
  // let youtube = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
  // const barkingZone = "https://vcpout-sf01-altnetro.internetmultimediaonline.org/vcp/e877c883/playlist.m3u8";
  // const stayTuned = "../../stay-tuned.mp4"
 

  const [ videoSource, setVideoSource ] = useState(currentPage?.liveStreamURL);
  const [ stayTuned, setStayTuned ] = useState(false)
  const [ playing, setPlaying ] = useState(true)

  // const aspectRatio = 0.5625;
  
  useEffect(()=>{
    if(videoSource !== currentPage.liveStreamURL ){
      setVideoSource(currentPage.liveStreamURL)
    }
  }, [videoSource, currentPage.liveStreamURL])

  const playerRef = React.useRef(null);

  // data-setup='{"techOrder": ["vimeo"], "sources": [{ "type":"video/vimeo", "src": "https://www.vimeo.com/380886323"}] }'

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    muted: false,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoSource,
        type: 'application/x-mpegURL'
      }
    ]
  };

  if(videoSource.includes('vimeo.com')){
    console.log(videoSource)
    delete videoJsOptions.sources;
    videoJsOptions['data-setup'] = `{"techOrder": ["vimeo"], "sources": [{ "type":"video/vimeo", "src": "${videoSource}"}] }`
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  function handleMediaError(e){
    console.log(e)
    setTimeout(() => {
      console.log('Checking if error is resolved.'); 
      setStayTuned(false)
      setPlaying(false)
    }, 5000)
    setStayTuned(true)
  }

  const isVimeo = currentPage.liveStreamURL.includes('vimeo.com')
  

  return (
    <div style={{width: '100%'}}>
      {isVimeo ? <ReactPlayer controls url="https://vimeo.com/3155182" /> : <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />}
    </div>
    //     {/* {stayTuned? <img src={stayTunedBanner} alt='stay-tuned' width={'100%'} height={'100%'} /> : attendanceSubmitted? 
    //     <ReactPlayer config={config} pip={true} stopOnUnmount={false} url={videoSource} width={"100%"} height={'100%'} id={"video-player"} controls playing={true} light={true} onError={handleMediaError}  />
    //     :
    //     // <MutedVideoPlayer />
    //     <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    //     } */}
  
    //     {/* <div style={{border: '2px solid grey', width: '100%', height: '50px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
    //         <div style={{color: "white"}}>SHARE</div>
    //         <div style={{color: "white"}}>CHURCH DASHBOARD</div>
    //         <div style={{color: "white"}}>MY DASHBOARD</div>
    //       <Link to="/admin-dashboard" className="link">
    //         <div style={{color: "white"}}>CHURCH DASHBOARD</div>
    //       </Link>
    //       <Link to="/my-dashboard" className="link">
    //         <div style={{color: "white"}}>MY DASHBOARD</div>
    //       </Link>
    //     </div> */}
      
   
  )
}