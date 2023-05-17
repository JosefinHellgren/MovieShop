import React from 'react';
import video from '../videos/walle.mp4';

import './playmovie.css'

function Playmovie() {
    return (
      <div className="video-container">
        <video className="video" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
export default Playmovie;