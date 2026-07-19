import React from 'react'

const tests = [
    { name: 'Complete blood count (CBC)', turnaround: 'Same day' },
    { name: 'Lipid profile', turnaround: 'Same day' },
    { name: 'Thyroid panel (T3, T4, TSH)', turnaround: 'Next day' },
    { name: 'HbA1c / diabetes panel', turnaround: 'Same day' },
    { name: 'Liver function test', turnaround: 'Same day' },
    { name: 'Vitamin D & B12', turnaround: '2 days' }
]

const Laboratories = () => {
    return (
        <div className='pb-16'>
            <div className='pt-10 text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>Diagnostics</p>
                <h1 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Lab tests, without the waiting room</h1>
                <p className='mt-4 max-w-2xl mx-auto text-sm text-slate-brand dark:text-slate-400'>Book a test online, have a technician collect the sample at home, and get results in your Doclyra profile as soon as they're ready.</p>
            </div>

            <div className='mt-12 grid gap-6 md:grid-cols-3'>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Home sample collection</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>A trained technician visits at a time you choose, with equipment sealed and logged for every sample.</p>
                </div>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Digital reports</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>Results land in your profile automatically, with your doctor able to view them at your next consultation.</p>
                </div>
                <div className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                    <p className='font-serif text-lg text-ink dark:text-slate-100'>Certified labs only</p>
                    <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>Every partner lab is NABL-accredited, so results are accepted anywhere you need them.</p>
                </div>
            </div>

            <div className='mt-14'>
                <p className='font-serif text-xl text-ink dark:text-slate-100'>Commonly booked tests</p>
                <div className='mt-5 divide-y divide-[#DDE4F0] dark:divide-slate-700 rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900'>
                    {tests.map((test, index) => (
                        <div key={index} className='flex items-center justify-between px-6 py-4'>
                            <p className='text-sm text-ink dark:text-slate-100'>{test.name}</p>
                            <span className='font-mono text-xs text-slate-brand dark:text-slate-400'>{test.turnaround}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Laboratories
