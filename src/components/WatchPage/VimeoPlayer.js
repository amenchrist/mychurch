import React, { useEffect } from 'react'
import { useMyStore } from '../../store';

export default function VimeoPlayer() {

  const { currentPage } = useMyStore();

    useEffect(() => {
        const script = document.createElement('script');
        const videoWidth = document.getElementById('made-in-ny').clientWidth    
        script.innerHTML = `
        //Var was used because the component mounts twice before unmounting, for some weird reason, and throws errors about variables being already existing
        //var happily reassigns existing variables unlike let and const
        var options = {
          url: '${currentPage.liveStreamURL}',
          width: ${videoWidth},
          loop: true
        };
    
        var player = new Vimeo.Player('my-vimeo-player', options);
    
        player.setVolume(0);
    
        player.on('play', function() {
            console.log('played the video!');
        });
    `;
        script.async = true;
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);
      
      return (
        <div id="my-vimeo-player" style={{width: '100%'}} ></div>
      )
}
