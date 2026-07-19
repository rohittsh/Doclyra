import React from 'react'

const Pharmacies = () => {
    return (
        <div className='pb-16'>
            <div className='pt-10 text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>Pharmacy network</p>
                <h1 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Prescriptions, delivered</h1>
                <p className='mt-4 max-w-2xl mx-auto text-sm text-slate-brand dark:text-slate-400'>Every prescription written on Doclyra can be sent straight to a partner pharmacy near you, or delivered to your door.</p>
            </div>

            <div className='mt-12 grid gap-6 sm:grid-cols-2'>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Direct e-prescriptions</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>No paper, no photos of handwriting. Your doctor sends the prescription to the pharmacy the moment your visit ends.</p>
                </div>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Home delivery</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>Choose delivery at checkout and track the order the same way you'd track any other package.</p>
                </div>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Generic alternatives</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>Pharmacists flag lower-cost generic equivalents at checkout, with your doctor's approval already on file.</p>
                </div>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Refill reminders</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>For ongoing medication, we remind you a few days before a refill is due, not after you've run out.</p>
                </div>
            </div>
        </div>
    )
}

export default Pharmacies
