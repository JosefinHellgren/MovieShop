import React, {useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import './playmovie.css'
import video from '../videos/movie.mp4'



function Playmovie() {



  let navigate = useNavigate();

  


  const handleGoBack = () => {
    navigate(-1);
  };



  
  //Går till fullscreen när man dubbelklickar på video
  const handleFullscreenChange = () => {
    setIsFullscreen((prevState) => !prevState);
  };




    return (
      <div className="video-container">
        
        <video className="video" controls autoPlay fullscreen playsInline onDoubleClick={handleFullscreenChange}>
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