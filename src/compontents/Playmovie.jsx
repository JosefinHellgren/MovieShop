
import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";


import './playmovie.css'
import video from '../videos/newmovie.mp4'



function Playmovie({toggleUserIconVisibility}) {

useEffect(() => {
  toggleUserIconVisibility(true);
},[])
 


  let navigate = useNavigate();
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  


  const handleGoBack = () => {
    navigate(-1);
  };




  
  //Går till fullscreen när man dubbelklickar på video
  const handleFullscreenChange = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  //To go fullscreen when double-clicking on the video
  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.paused) {
      videoElement.play();
    } else if (videoElement) {
      videoElement.pause();
    }
  };



    return (
      <div className="video-container">
        
        <video className="video" controls autoPlay fullscreen="true" playsInline onDoubleClick={handleFullscreenChange} onClick={handleVideoClick}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
       
        <div className="overlay-text" onClick={handleGoBack}>
        ← Click to Go Back
      </div>

      </div>
    );
  }
export default Playmovie;