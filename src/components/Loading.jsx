import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', fullScreen = false }) => {
  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className={`loading-spinner ${size}`}>
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loading; 