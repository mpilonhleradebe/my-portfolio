'use client';
import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [title] = useState(['Developer', 'Designer']);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(timer);
          // Start transition after a brief pause
          setTimeout(() => {
            setShowTransition(true);
            // Call onComplete after transition starts
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800); // Match transition duration
          }, 500);
          return 100;
        }
        return prev + 1.5; // Adjust speed here (lower = slower)
      });
    }, 50); // Adjust interval for smoothness

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-screen relative flex flex-col justify-center items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-white"></div>
      <div
        className={`absolute inset-0 bg-black transition-all duration-75 ease-out ${
          showTransition ? 'transform -translate-x-full transition-transform duration-800 ease-in-out' : ''
        }`}
        style={{
          clipPath: showTransition ? 'none' : `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`
        }}
      ></div>

      {/* Loading Content */}
      <div 
        className={`relative z-10 flex flex-col items-center transition-all duration-800 ease-in-out ${
          showTransition ? 'transform -translate-x-full opacity-0' : ''
        }`}
      >
        {/* Name and title div */}
        <div className="flex items-baseline">
          <h3
            className={`font-bold text-2xl transition-colors duration-300 ${
              progress > 40 ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Mpilonhle Radebe
          </h3>
          <h3
            className={`ml-2 text-xl italic transition-colors duration-300 ${
              progress > 50 ? 'text-white' : 'text-black'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {progress > 55 ? title[1] : title[0]}
          </h3>
        </div>

        {/* Loading bar */}
        <div className="mt-6 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-400 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading text */}
        <div className="mt-4 flex items-center space-x-2">
          <span
            className={`text-sm transition-colors duration-300 ${
              progress > 50 ? 'text-white' : 'text-gray-600'
            }`}
          >
            LOADING
          </span>
          <span
            className={`text-sm transition-colors duration-300 ${
              progress > 50 ? 'text-white' : 'text-gray-600'
            }`}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Main App Component that handles the transition
const App = ({ children }) => {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowMainContent(true);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Main Content - Always visible underneath */}
      <div className="absolute inset-0">
        {children}
      </div>

      {/* Loading Screen - Slides away to reveal content underneath */}
      <div 
        className={`absolute inset-0 z-50 transition-transform duration-800 ease-in-out ${
          showMainContent ? 'transform -translate-x-full' : ''
        }`}
      >
        <LoadingScreen onComplete={handleLoadingComplete} />
      </div>
    </div>
  );
};

export default App;