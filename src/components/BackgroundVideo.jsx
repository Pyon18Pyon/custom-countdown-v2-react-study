import React from 'react';
import './BackgroundVideo.css';

function BackgroundVideo() {
  return (
    <div>
      <video className="video-background" loop muted autoPlay>
        <source src="./assets/video/Clock.mp4"></source>
      </video>
      <div className="video-overlay"></div>
    </div>
  )
}

export default BackgroundVideo;