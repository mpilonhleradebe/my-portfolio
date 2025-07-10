import React, {useState} from 'react';
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
}

const AllWork = ({ navItems, handleNavClick, activeItem, setActiveItem }: AllWorkProps) => {
  const [clicked, setClicked] = useState(false);
  

  return (
    <div className='w-screen h-screen' id='work'>
      <div className="absolute top-5 left-5 z-10">
        <AnimatePresence>
          {!clicked && (
            <motion.div
              key="navbar"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <NavBar 
                navItems={navItems} 
                onNavClick={handleNavClick}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/*split work view*/}
      <div className="z-2">
        <SplitView clicked={clicked} setClicked={setClicked} activeItem={activeItem} />
        
     </div>
    </div>
  );
};

export default AllWork;