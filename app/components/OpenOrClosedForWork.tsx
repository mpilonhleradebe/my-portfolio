import React from 'react'

const OpenOrClosedForWork = () => {
    const [isOpen, setIsOpen] = React.useState(true)
    const [company, setCompany] = React.useState('Amazon')

  return (
    <div className="flex items-center gap-3">
      {/* Status dot with pulse */}
      <div className="relative flex items-center justify-center w-4 h-4">
        <span
          className={`absolute inline-flex h-full w-full rounded-full 
            ${isOpen ? 'bg-green-300' : 'bg-gray-300'} opacity-75 animate-ping`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-3 w-3 
            ${isOpen ? 'bg-green-600' : 'bg-gray-500'}`}
        ></span>
      </div>

      {/* Status text */}
      <div className='w-xl'>
        {isOpen ? (
          <>
            <h2 className="text-[16px] text-[#666666]">
              Open to new opportunities
            </h2>
            <p className="text-neutral-900 text-[26px] font-semibold">
              Actively looking for roles in SDE, product, data, or creative tech.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-[16px] text-[#666666]">
              No longer exploring new opportunities
            </h2>
            <p className="text-neutral-900 text-[26px] font-semibold">
              I’ve recently joined {company}.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default OpenOrClosedForWork