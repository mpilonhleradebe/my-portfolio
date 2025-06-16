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
  const lastScrollTop = useRef(0); // Track last scroll position
  const directionRef = useRef<'up'|'down'>('down'); // Track scroll direction
  
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
      }, 50); // Reduced delay for quicker response
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, []);

  // Calculate background color with smooth gradient
  const calculateBgColor = () => {
    if (scrollProgress < BG_TRANSITION_START) return "rgb(0, 0, 0)";
    if (scrollProgress > BG_TRANSITION_END) return "rgb(255, 255, 255)";
    
    const ratio = (scrollProgress - BG_TRANSITION_START) / 
                  (BG_TRANSITION_END - BG_TRANSITION_START);
    const value = Math.floor(ratio * 255);
    return `rgb(${value}, ${value}, ${value})`;
  };

  const bgColor = calculateBgColor();

  // Scroll indicator fade effect
  const scrollIndicatorOpacity = Math.max(0, 1 - (scrollProgress * 1.5));

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
        <Hero />
        
        {/* Scroll Indicator */}
        <div 
          className="absolute top-[70vh] left-15 z-10 transition-opacity duration-300"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <WorkScrollEffect scrollProgress={scrollProgress}/>
        </div>
      </section>

      {/* Work Section */}
      <section 
        className="h-screen"
        style={{ 
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.5) * 1.5)),
          transition: 'opacity 100ms ease-out'
        }}
      >
        <AllWork />
      </section>
    </div>
  );
}