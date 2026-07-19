import React from 'react'
import { useNavigate } from 'react-router-dom'

const services = [
    {
        title: 'Doctor consultations',
        description: 'Book in-person or video visits with verified specialists across every major field, with same-week availability in most cities.'
    },
    {
        title: 'Video consultations',
        description: 'See a doctor from home over a secure video call, with in-call chat and instant e-prescriptions after the visit.'
    },
    {
        title: 'Health checkups',
        description: 'Preventive packages covering blood work, imaging, and a follow-up consultation to walk you through the results.'
    },
    {
        title: 'Prescription management',
        description: 'Every prescription is saved to your profile, so refills and pharmacy handoffs take one tap instead of a phone call.'
    },
    {
        title: 'Specialist referrals',
        description: "When your doctor recommends a specialist, we match you with someone who takes your insurance and has real availability."
    },
    {
        title: 'Appointment reminders',
        description: "Automatic email reminders before every visit, so a full inbox never turns into a missed appointment."
    }
]

const Services = () => {
    const navigate = useNavigate()

    return (
        <div className='pb-16'>
            <div className='pt-10 text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>What we offer</p>
                <h1 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Care, coordinated end to end</h1>
                <p className='mt-4 max-w-2xl mx-auto text-sm text-slate-brand dark:text-slate-400'>From the first booking to the follow-up prescription, every service on Doclyra is built around one visit going smoothly into the next.</p>
            </div>

            <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {services.map((service, index) => (
                    <div key={index} className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                        <p className='font-serif text-lg text-ink dark:text-slate-100'>{service.title}</p>
                        <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>{service.description}</p>
                    </div>
                ))}
            </div>

            <div className='mt-14 rounded-2xl bg-ink p-8 text-center sm:p-12'>
                <p className='font-serif text-2xl text-white'>Ready to book your first visit?</p>
                <p className='mt-2 text-sm text-slate-300'>Browse doctors by speciality and find the next available slot.</p>
                <button onClick={() => navigate('/doctors')} className='mt-6 rounded-full bg-primary px-8 py-3 text-white'>Find a doctor</button>
            </div>
        </div>
    )
}

export default Services
