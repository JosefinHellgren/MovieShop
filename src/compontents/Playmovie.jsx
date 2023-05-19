import React, {useRef, useEffect} from 'react';

import './playmovie.css'
import video from '../videos/movie.mp4'


function Playmovie() {


 




    return (
      <div className="video-container">
        <video className="video" controls autoPlay>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
export default Playmovie;