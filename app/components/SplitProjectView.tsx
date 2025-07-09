import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SplitProjectView() {
  const [clicked, setClicked] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const labelRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const [labelPos, setLabelPos] = useState({ x: 0, y: 0 });

  // Update mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const animate = () => {
      setLabelPos((prev) => {
        const dx = mouse.x - prev.x;
        const dy = mouse.y - prev.y;
        return {
          x: prev.x + dx * 0.1,
          y: prev.y + dy * 0.1,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [mouse]);

  return (
    <div
      className="flex flex-row w-screen h-screen overflow-hidden cursor-pointer"
      onClick={() => setClicked(!clicked)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative' }}
    >
      {/* Cursor label with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={clicked ? 'close' : 'open'}
          ref={labelRef}
          style={{
            position: 'fixed',
            left: labelPos.x,
            top: labelPos.y + 32,
            pointerEvents: 'none',
            zIndex: 10000,
            fontSize: 16,
            fontWeight: 600,
            color: '#fff',
            mixBlendMode: 'difference',
            userSelect: 'none',
          }}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {clicked ? 'close' : 'open'}
        </motion.div>
      </AnimatePresence>

      {/* left side - project details */}
      <div className={`${clicked ? 'w-[60vw]': 'w-[50vw]'} h-screen bg-white relative`}>
        {/* gif reel */}
      {!clicked ? (
        <motion.div
          className="flex flex-col items-center justify-center w-full h-full relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src="/gifs/drafted/drafted01.gif"
            alt="drafted reel"
            className=""
          />
        </motion.div>
      ) : (
        // project information
            <motion.div
              className="flex flex-col px-12 py-8 w-full h-screen"
              initial={{ opacity: 0, y: 80, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ transformOrigin: 'top center' }}
            >

              {/* challenge */}
              <motion.div
                className="flex flex-row gap-40 mt-50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              >
                <h1 className="text-black text-[15px] whitespace-nowrap">challenge:</h1>
                <p className="text-black text-[15px] w-5vw">
                  Unreleased music lives everywhere but nowhere. DAWs. Cloud drives. Forgotten hard disks.
                  There’s no single place where artists can see their work, feel its potential, and decide what comes next.
                  Drafted began with a simple question:
                  What if unfinished music had a home?
                </p>
              </motion.div>


              {/* Approach */}
              <motion.div
                className="flex flex-row gap-40 mt-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
              >
                <h1 className="text-black text-[15px] whitespace-nowrap">approach:</h1>
                <p className="text-black text-[15px] w-5vw">
                  Drafted is a platform for artists to store, share, and discover unfinished music.
                  It’s a place to see what’s possible, and to find collaborators who can help make it real.
                  We designed the experience to be simple, intuitive, and inspiring.
                </p>
              </motion.div>

              {/* role */}
              <motion.div
                className="flex flex-row gap-45 mt-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              >
                <h1 className="text-black text-[15px] whitespace-nowrap">role:</h1>
                <ul className="text-black text-[15px] w-5vw pl-5">
                  <li>Product Design</li>
                  <li>UI/UX</li>
                  <li>Frontend</li>
                  <li>Creative Direction</li>
                  <li>Branding</li>
                </ul>
              </motion.div>
              
          </motion.div>
      )}

        {/* project title and year */}
        <div className="absolute bottom-4 left-0 right-0 px-6 flex flex-row justify-between items-center z-10">
          <h1 className="font-semibold text-5xl text-black uppercase text-left">drafted</h1>
          <AnimatePresence mode="wait">
            {!clicked ? (
              <motion.h1
                key="year"
                className="font-semibold text-5xl text-black uppercase text-right"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                2024
              </motion.h1>
            ) : (
              <motion.div
                key="more"
                className="flex flex-col items-end"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <p className='text-black uppercase'>more</p>
                <img src="/icons/arrow-more.png" alt="" className='w-4 rotate-265 mr-2'/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* right side - project visuals */}
      <div className="w-[50vw] h-screen bg-white justify-center flex relative">
        {/* image scrollbar */}
        <div
          className={`transition-all duration-500 overflow-hidden
            ${clicked ? 'h-[70vh] w-[30vw]' : 'h-screen w-auto'}`}
          style={
            clicked
              ? {
            transform: 'translate(100px, 150px)',
            transition: 'transform 0.5s, width 0.5s, height 0.5s',
          }
              : {
            transform: 'translate(0, 0)',
            transition: 'transform 0.5s, width 0.5s, height 0.5s',
          }
          }
        >
          <motion.img
            src="/images/drafted/1.png"
            alt=""
            className="w-full h-full object-cover rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}

export default SplitProjectView;