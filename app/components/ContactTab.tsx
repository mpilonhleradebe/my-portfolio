import React from 'react'
import Link from 'next/link';

const ContactTab = () => {
  return (
    <div className="">
      <ul>
        <li className='mb-12'>
          {/* email */}
          <Link href="mailto:mpilonhleradebe@icloud.com" className='inline-block' target='_blank'>
            <img src="../icons/email-dark.png" alt="email icon" className='w-5'/>
          </Link>
        </li>
        <li className='mb-12'>
          {/* linkedin */}
          <Link href="https://www.linkedin.com/in/mpilonhle-radebe-33627b237/" className='inline-block' target='_blank'>
            <img src="../icons/linkedin-dark.png" alt="linkedin icon" className='w-5'/>
          </Link>
        </li>
        <li className='mb-12'>
          {/* x (twitter) */}
          <Link href="https://x.com/mpilo_person" className='inline-block' target='_blank'>
            <img src="../icons/x-dark.png" alt="x icon" className='w-5'/>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ContactTab