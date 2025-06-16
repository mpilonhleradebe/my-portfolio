import React from 'react';
import NavBar from './NavBar';
import ShowCanvas from './ShowCanvas';

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
      <div className="flex justify-center mt-5">
        <NavBar 
          navItems={navItems} 
          onNavClick={handleNavClick}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>

      {/*show canvas*/}
      <div className="">
        <ShowCanvas />
      </div>
    </div>
  );
};

export default AllWork;