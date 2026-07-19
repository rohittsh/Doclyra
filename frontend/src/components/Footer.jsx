import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='mt-40 -mx-4 sm:-mx-[10%] bg-ink text-slate-300'>
      <div className='px-4 sm:px-[10%]'>
        <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 py-16 text-sm'>

          <div>
            <div className='mb-5 flex items-center gap-3'>
              <svg width='40' height='40' viewBox='0 0 44 44' fill='none'>
                <rect width='44' height='44' rx='12' fill='#1B4B91' />
                <path d='M8 24H15L18 15L24 32L27.5 24H36' stroke='white' strokeWidth='2.6' strokeLinecap='round' strokeLinejoin='round' fill='none' />
              </svg>
              <span className='font-serif text-2xl text-white'>Doc<span className='text-gold'>lyra</span></span>
            </div>
            <p className='w-full leading-6'>An integrated healthcare ecosystem connecting patients, doctors, laboratories, and pharmacies — through one intelligent platform.</p>
          </div>

          <div>
            <p className='text-lg font-serif mb-5 text-white'>Platform</p>
            <ul className='flex flex-col gap-2'>
              <li><Link to='/services' className='hover:text-white transition-colors'>Services</Link></li>
              <li><Link to='/doctors' className='hover:text-white transition-colors'>Doctors</Link></li>
              <li><Link to='/laboratories' className='hover:text-white transition-colors'>Laboratories</Link></li>
              <li><Link to='/pharmacies' className='hover:text-white transition-colors'>Pharmacies</Link></li>
              <li><Link to='/corporate' className='hover:text-white transition-colors'>Corporate Healthcare</Link></li>
            </ul>
          </div>

          <div>
            <p className='text-lg font-serif mb-5 text-white'>Company</p>
            <ul className='flex flex-col gap-2'>
              <li><Link to='/about' className='hover:text-white transition-colors'>About Us</Link></li>
              <li><Link to='/careers' className='hover:text-white transition-colors'>Careers</Link></li>
              <li><Link to='/blog' className='hover:text-white transition-colors'>Blog</Link></li>
              <li><Link to='/contact' className='hover:text-white transition-colors'>Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className='text-lg font-serif mb-5 text-white'>Reach Us</p>
            <ul className='flex flex-col gap-3'>
              <li>Street No. 28B, Primary School, Konch, Gaya, Bihar – 824207, India</li>
              <li><a href='tel:+919110038050' className='hover:text-white transition-colors'>+91 9110038050</a></li>
              <li><a href='mailto:baburohit1392@gmail.com' className='hover:text-white transition-colors'>hello@doclyra.com</a></li>
            </ul>
          </div>

        </div>

        <div className='border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400'>
          <p>© 2026 Doclyra Healthcare Technologies™. All rights reserved.</p>
          <p className='font-serif text-sm text-slate-300'>Care Beyond Distance.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
