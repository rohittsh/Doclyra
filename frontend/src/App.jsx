import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import VideoCall from './pages/VideoCall'
import Services from './pages/Services'
import Laboratories from './pages/Laboratories'
import Pharmacies from './pages/Pharmacies'
import Corporate from './pages/Corporate'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import CookieConsent from './components/CookieConsent'

const App = () => {
  return (
    <div className='min-h-screen bg-canvas text-ink transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100'>
      <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/video-call/:appointmentId' element={<VideoCall />} />
        <Route path='/services' element={<Services />} />
        <Route path='/laboratories' element={<Laboratories />} />
        <Route path='/pharmacies' element={<Pharmacies />} />
        <Route path='/corporate' element={<Corporate />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/blog' element={<Blog />} />
      </Routes>
      <Footer />
      </div>
      <CookieConsent />
    </div>
  )
}

export default App