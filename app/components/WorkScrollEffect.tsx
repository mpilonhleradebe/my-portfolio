import React from 'react'

type ScrollProgressProp = {
  scrollProgress: number;
};

const WorkScrollEffect = ( {scrollProgress }: ScrollProgressProp) => {
  return (
    <div className=''>
      <a href="">
        <h2 className='text-[11px] font-bold'>WORK</h2>
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
  )
}

export default WorkScrollEffect