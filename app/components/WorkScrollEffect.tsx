'use client';
import React from 'react';

type ScrollProgressProp = {
  scrollProgress: number;
  onWorkClick?: () => void; // Add click handler prop
};

const WorkScrollEffect = ({ scrollProgress, onWorkClick }: ScrollProgressProp) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onWorkClick) {
      onWorkClick();
    }
  };

  return (
    <div className=''>
      <a 
        href="#work" 
        onClick={handleClick}
        className="cursor-pointer hover:opacity-70 transition-opacity"
      >
        <h2 className='text-[11px] font-bold text-white'>WORK</h2>
      </a>
      {/* scroll effect */}
      <div className="w-[2px] h-52 bg-[#3B3B3B] mt-4 relative">
        {/* inner animated effect */}
        <div 
          className="w-[2px] bg-[#A1A1A1] transition-all duration-100 ease-out"
          style={{
            height: `${scrollProgress * 100}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default WorkScrollEffect;