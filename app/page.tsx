'use client'
import Hero from "./components/Hero";
import AllWork from "./components/AllWork";
import React, { useState, useEffect, useRef } from "react";
import WorkScrollEffect from "./components/WorkScrollEffect";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollEndTimer = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTop = useRef(0);
  const directionRef = useRef<'up' | 'down'>('down');
  const [activeItem, setActiveItem] = useState<string>('intro'); // Set initial active item
  
  // Smoother background transition
  const BG_TRANSITION_START = 0.3;
  const BG_TRANSITION_END = 0.7;

  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    if (!container || !hero) return;

    const handleScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
      }
      
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current);
      }

      // Calculate scroll direction
      const currentScrollTop = container.scrollTop;
      if (currentScrollTop > lastScrollTop.current) {
        directionRef.current = 'down';
      } else if (currentScrollTop < lastScrollTop.current) {
        directionRef.current = 'up';
      }
      lastScrollTop.current = currentScrollTop;

      const heroHeight = hero.clientHeight;
      const progress = Math.min(1, currentScrollTop / heroHeight);
      setScrollProgress(progress);

      // Update active item based on scroll position and direction
      if (directionRef.current === 'down' && progress > 0.5) {
        setActiveItem('work');
      } else if (directionRef.current === 'up' && progress < 0.5) {
        setActiveItem('intro');
      }

      // Set timeout for snap effect with reduced delay
      scrollEndTimer.current = setTimeout(() => {
        isScrolling.current = false;
        const direction = directionRef.current;
        const shouldSnapToWork = direction === 'down' && progress > 0.3;
        const shouldSnapToHero = direction === 'up' && progress < 0.7;
        
        if (shouldSnapToWork || shouldSnapToHero) {
          container.scrollTo({
            top: shouldSnapToWork ? heroHeight : 0,
            behavior: 'smooth'
          });
        }
      }, 80);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setActiveItem(id); // Set active item on click
    const container = containerRef.current;
    if (!container) return;

    if (id === 'intro') {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const targetSection = document.getElementById(id);
      if (targetSection) {
        container.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };
  
  const handleWorkClick = () => {
    if (workRef.current && containerRef.current) {
      containerRef.current.scrollTo({
        top: workRef.current.offsetTop,
        behavior: 'smooth'
      });
      setActiveItem('work');
    }
  };

  const calculateBgColor = () => {
    if (scrollProgress < BG_TRANSITION_START) return "rgb(0, 0, 0)";
    if (scrollProgress > BG_TRANSITION_END) return "rgb(254, 254, 254);";
    
    const ratio = (scrollProgress - BG_TRANSITION_START) / 
                  (BG_TRANSITION_END - BG_TRANSITION_START);
    const value = Math.floor(ratio * 255);
    return `rgb(${value}, ${value}, ${value})`;
  };

  const bgColor = calculateBgColor();
  const scrollIndicatorOpacity = Math.max(0, 1 - (scrollProgress * 1.5));

      const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'resume', label: 'Resume' }
      ];
  
  
  
  //refs
  const workRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen overflow-y-auto scroll-smooth"
      style={{ 
        backgroundColor: bgColor,
        transition: isScrolling.current ? 'none' : 'background-color 200ms ease'
      }}
    >
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="h-screen"
      >
        <Hero scrollProgress={scrollProgress} setScrollProgress={setScrollProgress}/>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute top-[70vh] left-15 z-10 transition-opacity duration-300"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <WorkScrollEffect 
  scrollProgress={scrollProgress} 
  onWorkClick={handleWorkClick} 
/>
        </div>
      </section>

      {/* Fixed Work Section */}
      <section 
        ref={workRef} 
        id="work"
        className="min-h-screen"
        style={{ 
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.3) * 2)),
          transition: 'opacity 100ms ease-out'
        }}
      >
        <AllWork 
          navItems={navItems} 
          handleNavClick={handleNavClick} 
          activeItem={activeItem} 
          setActiveItem={setActiveItem} 
        />
      </section>
    </div>
  );
}