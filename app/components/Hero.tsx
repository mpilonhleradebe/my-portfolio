'use client'
import React, { useState, useEffect, useRef } from 'react'
import ContactTab from './ContactTab'
import WorkScrollEffect from './WorkScrollEffect'

type scrollProgressProp = {
  scrollProgress: number
  setScrollProgress: (progress: number) => void
}

const Hero = ({scrollProgress, setScrollProgress}: scrollProgressProp) => {

    const heroRef = useRef<HTMLDivElement | null>(null)

  return (
    <div 
      ref={heroRef}
      className='w-screen h-screen'
    >
      {/* contact tabs */}
      <div className="pl-15 pt-15 ">
        <ContactTab />
      </div>
      {/* Name and intro message. */}
      <div className="ml-100 text-2xl mt-20" >
        <h1 className='font-bold'>Mpilonhle Radebe</h1>
        <h1 className='text-7xl font-bold mt-10'>Software Engineer</h1>
        <h1 className='text-7xl font-bold mt-5'>Based in Johannesburg.</h1>
        <h1 className='text-7xl font-bold mt-20 w-200'>
          focused on human-centered design and meaningful tech.
        </h1>
      </div>
      {/* scrolldown effect */}

      {/* Add some extra content to make it scrollable */}
          <div className="h-96"></div>
    </div>
  )
}

export default Hero