import React from 'react'
import { useNavigate } from 'react-router-dom'

const FinalCTA = () => {
    const navigate = useNavigate()

    return (
        <div className='my-16 rounded-[28px] bg-ink px-6 py-14 text-center sm:px-14'>
            <p className='font-serif text-3xl text-white sm:text-4xl'>Experience healthcare without boundaries.</p>
            <p className='mt-3 text-slate-300'>Join thousands of patients and partners who chose connected care.</p>
            <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
                <button onClick={() => navigate('/contact')} className='rounded-full bg-primary px-8 py-3 text-white'>Get Started</button>
                <button onClick={() => navigate('/contact')} className='rounded-full border border-white/30 px-8 py-3 text-white'>Contact Us</button>
            </div>
        </div>
    )
}

export default FinalCTA
