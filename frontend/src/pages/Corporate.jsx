import React from 'react'

const Corporate = () => {
    return (
        <div className='pb-16'>
            <div className='pt-10 text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>For businesses</p>
                <h1 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Healthcare as an employee benefit</h1>
                <p className='mt-4 max-w-2xl mx-auto text-sm text-slate-brand dark:text-slate-400'>Doclyra for Corporate gives your team direct access to doctors, checkups, and reminders — with one dashboard for HR to manage it all.</p>
            </div>

            <div className='mt-12 grid gap-6 md:grid-cols-3'>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Annual health checkups</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>Scheduled checkup packages for your whole team, with results aggregated (anonymously) for wellness reporting.</p>
                </div>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>On-site clinic days</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>We bring doctors to your office on a recurring schedule, so routine care doesn't cost anyone a half-day off.</p>
                </div>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>HR dashboard</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>Track enrollment and utilization at a team level, without ever seeing an individual employee's medical details.</p>
                </div>
            </div>

            <div className='mt-14 rounded-2xl bg-ink p-8 text-center sm:p-12'>
                <p className='font-serif text-2xl text-white'>Bring Doclyra to your workplace</p>
                <p className='mt-2 text-sm text-slate-300'>Tell us your team size and we'll put together a plan that fits.</p>
                <a href='mailto:corporate@doclyra.in' className='mt-6 inline-block rounded-full bg-primary px-8 py-3 text-white'>Talk to our team</a>
            </div>
        </div>
    )
}

export default Corporate
