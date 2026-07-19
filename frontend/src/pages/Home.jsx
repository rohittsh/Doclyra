import React, { useContext } from 'react'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import WhyDoclyra from '../components/WhyDoclyra'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { reminders, token } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div>
      {token && reminders.length > 0 && (
        <div className='mb-6 rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950 p-4 text-sm text-amber-800 dark:text-amber-300'>
          You have {reminders.length} upcoming appointment{reminders.length === 1 ? '' : 's'} to prepare for.
        </div>
      )}

      <section className='relative overflow-hidden rounded-[28px] border border-[#DDE4F0] dark:border-slate-700 bg-canvas dark:bg-slate-900 p-8 sm:p-14'>
        <div className='relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>Trusted care, precisely scheduled</p>
            <h1 className='font-serif mt-4 text-4xl leading-tight text-ink dark:text-slate-100 sm:text-5xl'>Care that moves at the pace of trust.</h1>
            <p className='mt-5 max-w-xl text-lg text-slate-brand dark:text-slate-400'>Doclyra pairs verified specialists with a calm, dependable booking experience — from the first search to the follow-up reminder.</p>

            {/* Signature element: an animated vital-line (EKG pulse) drawn once on load */}
            <svg className='vital-line mt-8 w-full max-w-md' height='40' viewBox='0 0 400 40' fill='none' aria-hidden='true'>
              <path d='M0 20 H140 L158 4 L176 36 L194 12 L206 28 L218 20 H400' stroke='#1B4B91' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>

            <div className='mt-6 flex flex-wrap gap-3'>
              <button onClick={() => navigate('/doctors')} className='rounded-full bg-primary px-6 py-3 text-white shadow-lg shadow-primary/20'>Find a doctor</button>
              <button onClick={() => navigate('/about')} className='rounded-full border border-primary/30 px-6 py-3 text-primary dark:text-slate-200'>Explore more</button>
            </div>
          </div>

          <div className='rounded-[24px] bg-ink p-6 shadow-2xl'>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
                <p className='text-sm text-slate-300'>Smart reminders</p>
                <p className='font-serif mt-2 text-2xl text-white'>24/7</p>
              </div>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
                <p className='text-sm text-slate-300'>Live availability</p>
                <p className='font-serif mt-2 text-2xl text-white'>Instant</p>
              </div>
              <div className='rounded-2xl border border-gold/30 bg-gold/10 p-4 sm:col-span-2'>
                <p className='text-sm text-gold'>Flexible payments</p>
                <p className='font-serif mt-2 text-2xl text-white'>Secure and clear</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <WhyDoclyra />
      <Testimonials />
      <FinalCTA />
      <FAQ />
    </div>
  )
}

export default Home