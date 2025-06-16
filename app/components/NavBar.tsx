'use client';
import React, { useState } from 'react';

type NavItem = {
  id: string;
  label: string;
};

type NavItemsProp = {
  navItems: NavItem[];
    onNavClick: (id: string) => void; // Add this prop
    activeItem: string | null;
    setActiveItem: (id: string) => void;
};

const NavBar = ({ navItems, onNavClick,activeItem,setActiveItem }: NavItemsProp) => {
  

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveItem(id);
    onNavClick(id); // Use the passed handler
  };

  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-10 align-middle">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`font-semibold text-black transition-opacity hover:opacity-100 focus:opacity-100 ${
                activeItem === item.id ? 'opacity-100' : 'opacity-20'
              }`}
              onClick={(e) => handleClick(item.id, e)}
              aria-current={activeItem === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;