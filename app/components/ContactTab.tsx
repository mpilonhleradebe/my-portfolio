import React from 'react'
import Link from 'next/link';

const ContactTab = () => {
  return (
    <div className="">
      <ul>
        <li className='mb-12'>
          {/* email */}
          <Link href="" className='inline-block'>
            <img src="../icons/email-dark.png" alt="email icon" className='w-5'/>
          </Link>
        </li>
        <li className='mb-12'>
          {/* linkedin */}
          <Link href="" className='inline-block'>
            <img src="../icons/linkedin-dark.png" alt="linkedin icon" className='w-5'/>
          </Link>
        </li>
        <li className='mb-12'>
          {/* x (twitter) */}
          <Link href="" className='inline-block'>
            <img src="../icons/x-dark.png" alt="x icon" className='w-5'/>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ContactTab