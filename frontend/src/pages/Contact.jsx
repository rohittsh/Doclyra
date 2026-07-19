import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-slate-brand dark:text-slate-400'>
        <p className='font-serif'>CONTACT <span className='text-ink dark:text-slate-200 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-ink dark:text-slate-200'>OUR OFFICE</p>
          <p className=' text-gray-500 dark:text-slate-400'>2nd Floor, Galaxy Business Park <br /> Sector 62, Noida, Uttar Pradesh-201309, India</p>
          <p className=' text-gray-500 dark:text-slate-400'>Tel: +91 98765 43210 <br /> Email: support@doclyra.in</p>
          <p className=' font-semibold text-lg text-ink dark:text-slate-200'>CAREERS AT DOCLYRA</p>
          <p className=' text-gray-500 dark:text-slate-400'>Learn more about our teams and job openings.</p>
          <button className='border border-black dark:border-slate-500 dark:text-slate-200 px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
