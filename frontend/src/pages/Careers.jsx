import React from 'react'

const openings = [
    { role: 'Frontend Engineer', team: 'Product', location: 'Remote / Bengaluru' },
    { role: 'Backend Engineer (Node.js)', team: 'Product', location: 'Remote / Bengaluru' },
    { role: 'Doctor Partnerships Manager', team: 'Operations', location: 'Mumbai' },
    { role: 'Customer Support Associate', team: 'Support', location: 'Remote' },
    { role: 'Product Designer', team: 'Product', location: 'Remote / Bengaluru' }
]

const Careers = () => {
    return (
        <div className='pb-16'>
            <div className='pt-10 text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>Join us</p>
                <h1 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Help build calmer healthcare</h1>
                <p className='mt-4 max-w-2xl mx-auto text-sm text-slate-brand dark:text-slate-400'>We're a small team working on booking, reminders, and everything else that makes a doctor's visit less stressful. Here's what we're hiring for right now.</p>
            </div>

            <div className='mt-12 divide-y divide-[#DDE4F0] dark:divide-slate-700 rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900'>
                {openings.map((job, index) => (
                    <div key={index} className='flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between'>
                        <div>
                            <p className='font-serif text-base text-ink dark:text-slate-100'>{job.role}</p>
                            <p className='text-xs text-slate-brand dark:text-slate-400'>{job.team} · {job.location}</p>
                        </div>
                        <a href='mailto:careers@doclyra.in' className='text-sm font-medium text-primary'>Apply</a>
                    </div>
                ))}
            </div>

            <p className='mt-8 text-center text-sm text-slate-brand dark:text-slate-400'>Don't see a fit? Write to us at <a href='mailto:careers@doclyra.in' className='text-primary'>careers@doclyra.in</a> anyway.</p>
        </div>
    )
}

export default Careers
