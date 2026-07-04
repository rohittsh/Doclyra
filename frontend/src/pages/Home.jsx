import React, { useContext } from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { reminders, token } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div>
      {token && reminders.length > 0 && (
        <div className='mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800'>
          You have {reminders.length} upcoming appointment{reminders.length === 1 ? '' : 's'} to prepare for.
        </div>
      )}

      <section className='relative overflow-hidden rounded-[32px] border border-blue-100 bg-gradient-to-br from-[#eef4ff] via-white to-[#f6f8ff] p-8 shadow-[0_20px_60px_rgba(95,111,255,0.12)] sm:p-12'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(95,111,255,0.2),_transparent_45%)]' />
        <div className='relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-primary'>Premium healthcare access</p>
            <h1 className='mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl'>Book trusted care with clarity, speed, and confidence.</h1>
            <p className='mt-4 max-w-xl text-lg text-slate-600'>From instant booking to reminders and payment insights, Prescripto brings every step of your care journey into one refined experience.</p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <button onClick={() => navigate('/doctors')} className='rounded-full bg-primary px-6 py-3 text-white shadow-lg shadow-primary/20'>Find a doctor</button>
              <button onClick={() => navigate('/about')} className='rounded-full border border-primary/20 px-6 py-3 text-primary'>Explore more</button>
            </div>
          </div>
          <div className='rounded-[24px] bg-white/80 p-6 shadow-xl backdrop-blur'>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl border border-blue-100 bg-blue-50 p-4'>
                <p className='text-sm text-blue-700'>Smart reminders</p>
                <p className='mt-2 text-2xl font-semibold text-slate-900'>24/7</p>
              </div>
              <div className='rounded-2xl border border-green-100 bg-green-50 p-4'>
                <p className='text-sm text-green-700'>Live availability</p>
                <p className='mt-2 text-2xl font-semibold text-slate-900'>Instant</p>
              </div>
              <div className='rounded-2xl border border-purple-100 bg-purple-50 p-4 sm:col-span-2'>
                <p className='text-sm text-purple-700'>Flexible payments</p>
                <p className='mt-2 text-2xl font-semibold text-slate-900'>Secure and clear</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home