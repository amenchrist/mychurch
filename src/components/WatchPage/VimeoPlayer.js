import React, { useEffect, useRef } from 'react'
import { useMyStore } from '../../store';
import Player from '@vimeo/player';
import './VimeoPlayer.css';

export default function VimeoPlayer({link}) {

  const { currentPage } = useMyStore();

  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && !playerRef.current) {
      playerRef.current = new Player(iframeRef.current);

      // Example: listen to play event
      playerRef.current.on('play', () => {
        console.log('The video is playing');
      });

      // Add more events as needed
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.unload().then(() => {
          playerRef.current = null;
        });
      }
    };
  }, []);
      
      return (
        // <div id="my-vimeo-player" style={{width: '100%'}} ></div>
        // <div style={vWrapperClass}>
        //   <iframe
        //     style={vWrapperIframe}
        //     src={currentPage.liveStreamURL}
        //     frameBorder="0"
        //     allow="autoplay; fullscreen; picture-in-picture"
        //     allowFullScreen
        //     title={`${currentPage.name} Live Stream`}
        //   ></iframe>
        // </div>
        // <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        //   <iframe
        //     title={`${currentPage.name} Live Stream`}
        //     src="https://vimeo.com/event/5340725/embed/128ac85e0d"
        //     frameBorder="0"
        //     allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
        //     referrerPolicy="strict-origin-when-cross-origin"
        //     allowFullScreen
        //     style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        //   ></iframe>
        // </div>
        // <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        //   <iframe
        //     title={`${currentPage.name} Live Stream`}
        //     src="https://vimeo.com/event/5340725/embed/128ac85e0d"
        //     frameBorder="0"
        //     allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
        //     referrerPolicy="strict-origin-when-cross-origin"
        //     allowFullScreen
        //     style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        //   ></iframe>
        // </div>
        <div className="vimeo-wrapper">
          <iframe
            ref={iframeRef}
            src={"https://vimeo.com/event/5340725/embed/128ac85e0d"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo Event"
            frameBorder="0"
          />
        </div>
      )
}
