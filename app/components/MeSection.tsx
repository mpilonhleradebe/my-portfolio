import React from 'react'
import OpenOrClosedForWork from './OpenOrClosedForWork'

const MeSection = () => {
  return (
    <div className='w-screen h-screen pl-5 relative overflow-hidden'>
      {/* top full name and current occupation */}
      <div className="mt-30 flex flex-row">
        <h2 className='text-neutral-900 text-[16px]'>Hey, I’m</h2>
        <img src="/images/profilepic-1.jpg" alt="Mpilonhle Radebe profile picture" className='w-6 h-6 rounded-[100] ml-2 mr-2' />
        <h2 className='text-neutral-900 text-[16px]'>Mpilonhle Radebe</h2>
      </div>

      {/* occupation */}
      <div className="">
        <h2 className='text-gray-300 text-[16px]'>A software developer & student focused on clean design and useful tools</h2>
      </div>

      {/* looking for work? */}
      <div className='absolute bottom-1/6 left-2/5'>
        <OpenOrClosedForWork />
      </div>

      {/* descriptive paragraphs */}
      <div className="flex flex-row gap-30 mt-40">
        {/* technically */}
        <div className="w-[660px] flex flex-col gap-5">
          <h2 className='text-neutral-900 text-[26px] whitespace-nowrap font-semibold'>technically,</h2>
          <p className='text-zinc-800 tracking-wide text-[16px] leading-7'>
            I’m a final-year Information Systems student with a focus on <b>software development</b>, <b>product design</b>, and <b>data</b>.
            I’ve worked on a range of projects — from a mobile safety app AlertNet, to a music vault platform for artists Drafted, to a clean personal site that reflects how I think.
            Right now, I’m diving deeper into backend dev, sharpening my frontend skills with React and Next.js, and learning to build faster without breaking clarity.
          </p>
        </div>

        {/* but */}
        <div className="w-[560px] flex flex-col gap-5">
          <h2 className='text-neutral-900 text-[26px] whitespace-nowrap font-semibold'>but,</h2>
          <p className='text-zinc-800 tracking-wide text-[16px] leading-7'>
            Outside of tech, I play the piano and make jazzy music. I love being creative,
            whether that’s through code, sound, or design. I’m also into video games, tennis,
            F1, football, and gym — anything that keeps me learning or pushing myself.
          </p>
        </div>

        {/* finally */}
        <div className="w-[560px] flex flex-col gap-5">
          <h2 className='text-neutral-900 text-[26px] whitespace-nowrap font-semibold'>finally,</h2>
          <p className='text-zinc-800 tracking-wide text-[16px] leading-7'>
            I love Jesus Christ, and pasta.
          </p>
        </div>
      </div>

      {/* bottom right profile image */}
      <img
        src="/images/profilepic-1.jpg"
        alt="Mpilonhle portrait full"
        className="absolute bottom-5 right-5 w-[450px] h-[450px] object-cover shadow-lg"
      />
    </div>
  )
}

export default MeSection