import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';
import ShowCanvas from './ShowCanvas';
import SplitView from './SplitView';

interface NavItem {
  id: string;
  label: string;
}

interface AllWorkProps {
  navItems: NavItem[];
  handleNavClick: (id: string) => void;
  activeItem: string | null;
  setActiveItem: (id: string) => void;
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}

const AllWork = ({ navItems, handleNavClick, activeItem, setActiveItem, clicked, setClicked }: AllWorkProps) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [labelPos, setLabelPos] = useState({ x: 0, y: 0 });
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const requestRef = useRef<number>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });
    if (!hasMouseMoved) {
      setHasMouseMoved(true);
    }
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
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mouse]);

  return (
    <div className='w-screen h-screen' id='work' onMouseMove={handleMouseMove}>
      {/* Cursor Label */}
      <AnimatePresence mode="wait">
        {hasMouseMoved && (
          <motion.div
            key={clicked ? 'close' : 'open'}
            style={{
              position: 'fixed',
              left: labelPos.x,
              top: labelPos.y + 32,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 10000,
              fontSize: 16,
              fontWeight: 600,
              color: '#fff',
              mixBlendMode: 'difference',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {clicked ? 'close' : 'open'}
          </motion.div>
        )}
      </AnimatePresence>

      {/*split work view*/}
      <div className="z-2">
        <SplitView clicked={clicked} setClicked={setClicked} activeItem={activeItem} />
      </div>
    </div>
  );
};

export default AllWork;