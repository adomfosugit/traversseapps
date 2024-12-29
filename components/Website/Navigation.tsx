import Link from 'next/link'
import React from 'react'


const Navigation = () => {
  return (
    <div className='hidden md:flex items-center space-x-4 text-primary text-sm'>
         <a
          href="AboutUs"
          className="cursor-pointer py-2 transition ease-in-out delay-150 hover:font-bold"
        >
          About Us
        </a>
         <a
          href="#contact"
          className="cursor-pointer py-2 transition ease-in-out delay-150 hover:font-bold"
        >
          Contact
        </a>
         <a
          href="#FAQs"
          className="cursor-pointer py-2 transition ease-in-out delay-150 hover:font-bold"
        >
          FAQs
        </a>
         <a
          href="#careers"
          className="cursor-pointer py-2 transition ease-in-out delay-150 hover:font-bold"
        >
          Careers
        </a>
    </div>
  )
}

export default Navigation