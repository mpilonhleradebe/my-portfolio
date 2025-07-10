import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickedState {
  clicked: boolean;
  setClicked: (id: boolean) => void;
  activeItem: string | null;
}

function SplitProjectView({ clicked, setClicked }: ClickedState) {
  const imageList = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
  ];

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const [labelPos, setLabelPos] = useState({ x: 0, y: 0 });
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  useEffect(() => {
    if (clicked) {
      setShowScrollIndicator(true);
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const handleScroll = () => {
          const scrollTop = scrollContainer.scrollTop;
          setShowScrollIndicator(scrollTop <= 10);
        };
        scrollContainer.addEventListener('scroll', handleScroll);
        return () => {
          scrollContainer.removeEventListener('scroll', handleScroll);
        };
      }
    } else {
      setShowScrollIndicator(false);
    }
  }, [clicked]);

  const handleClick = () => {
    if (clicked) {
      const container = scrollRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const paddingTop = 150; // Matches pt-[150px]
        const imageHeight = 700;
        const marginBottom = 16;
        let maxVisibleHeight = 0;
        let mostVisibleIndex = 0;

        imageList.forEach((_, index) => {
          const top = paddingTop + index * (imageHeight + marginBottom);
          const bottom = top + imageHeight;
          const visibleHeight = Math.max(
            0,
            Math.min(bottom, scrollTop + containerHeight) - Math.max(top, scrollTop)
          );
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            mostVisibleIndex = index;
          }
        });
        setActiveImageIndex(mostVisibleIndex);
      }
    }
    setClicked(!clicked);
  };

  return (
    <div
      className="flex flex-row w-screen h-screen overflow-hidden cursor-pointer"
      onClick={handleClick}
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

      {/* Left side - project details */}
      <div
        className={`transition-all duration-500 ease-linear ${
          clicked ? 'w-[60vw]' : 'w-[50vw]'
        } h-screen bg-white relative`}
      >
        {!clicked ? (
          <motion.div
            className="flex flex-col items-center justify-center w-full h-full relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'linear' }}
          >
            <img src="/gifs/drafted/drafted01.gif" alt="drafted reel" className="" />
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col px-12 py-8 w-full h-screen "
            initial={{ opacity: 0, y: 80, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, ease: 'linear' }}
            style={{ transformOrigin: 'top center' }}
          >
            <motion.div
              className="flex flex-row gap-40 mt-50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'linear' }}
            >
              <h1 className="text-black text-[15px] whitespace-nowrap mt-1">challenge:</h1>
              <p className="text-black text-[15px] w-5vw">
              Unreleased music lives everywhere but nowhere. DAWs. Cloud drives. Forgotten hard
              disks. There’s no single place where artists can see their work, feel its potential,
              and decide what comes next. Drafted began with a simple question: What if unfinished
              music had a home?
              </p>
            </motion.div>

            <motion.div
              className="flex flex-row gap-40 mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: 'linear' }}
            >
              <h1 className="text-black text-[15px] whitespace-nowrap">approach:</h1>
              <p className="text-black text-[15px] w-5vw">
                Drafted is a platform for artists to store, share, and discover unfinished music.
                It’s a place to see what’s possible, and to find collaborators who can help make it
                real. I designed the experience to be simple, intuitive, and inspiring.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-row gap-45 mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'linear' }}
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
                <p className="text-black uppercase">more</p>
                <img src="/icons/arrow-more.png" alt="" className="w-4 rotate-265 mr-2" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right side - project visuals */}
      <div
        className={`transition-all duration-500 ease-linear ${
          clicked ? 'w-[40vw]' : 'w-[50vw]'
        } h-screen bg-white relative flex justify-center`}
      >
        <div
          ref={scrollRef}
          className={`transition-all duration-500 ease-linear ${
            clicked ? 'h-screen w-[35vw] overflow-y-scroll pt-[100px]' : 'h-screen w-full overflow-hidden'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <motion.div className="flex flex-col w-full hide-scrollbar">
            {imageList.map((img, index) => (
              <motion.div
                key={img}
                layout
                animate={{
                  height: clicked ? '700px' : index === activeImageIndex ? '100vh' : '0px',
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: clicked ? 0.1 * index : 0,
                }}
                style={{ overflow: 'hidden', marginBottom: clicked ? '16px' : '0px' }}
              >
                <motion.img
                  src={`/images/drafted/${img}`}
                  alt={`drafted-${index}`}
                  className="w-full h-full object-cover"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 15,
                    delay: clicked ? 0.1 * index : 0,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-gray-400 text-xs"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5 }}
              >
                SCROLL DOWN TO SHOW MORE
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SplitProjectView;