import React from 'react';
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

const AllWork = ({ navItems, handleNavClick,activeItem,setActiveItem }: AllWorkProps) => {
  return (
    <div className='w-screen h-screen' id='work'>
      <div className="absolute top-5 left-5 z-10">
        <NavBar 
          navItems={navItems} 
          onNavClick={handleNavClick}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>

      {/*split work view*/}
      <div className="z-2">
         <SplitView />
     </div>
    </div>
  );
};

export default AllWork;