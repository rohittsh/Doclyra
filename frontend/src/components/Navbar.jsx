import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData, theme, setTheme, reminders } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#DDE4F0] dark:border-slate-700'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='md:flex flex-wrap items-start gap-x-5 gap-y-2 font-medium tracking-wide text-[13px] hidden'>
        <NavLink to='/' >
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/services' >
          <li className='py-1'>SERVICES</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1'>DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/laboratories' >
          <li className='py-1'>LABS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/pharmacies' >
          <li className='py-1'>PHARMACIES</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/corporate' >
          <li className='py-1'>CORPORATE</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/careers' >
          <li className='py-1'>CAREERS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/blog' >
          <li className='py-1'>BLOG</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className='inline-flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 dark:border-gray-700'
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        {reminders.length > 0 && (
          <span className='hidden md:inline-flex items-center rounded-full bg-red-100 dark:bg-red-950 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-300'>Reminder • {reminders.length}</span>
        )}
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 dark:bg-slate-900 dark:text-slate-200'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-canvas transition-all dark:bg-slate-950`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/services' ><p className='px-4 py-2 rounded full inline-block'>SERVICES</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/laboratories' ><p className='px-4 py-2 rounded full inline-block'>LABS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/pharmacies' ><p className='px-4 py-2 rounded full inline-block'>PHARMACIES</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/corporate' ><p className='px-4 py-2 rounded full inline-block'>CORPORATE</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/careers' ><p className='px-4 py-2 rounded full inline-block'>CAREERS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/blog' ><p className='px-4 py-2 rounded full inline-block'>BLOG</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar