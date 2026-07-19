import React from 'react'

const features = [
    {
        title: 'One platform experience',
        description: 'Doctor, lab, pharmacy and records — together, not scattered.'
    },
    {
        title: 'Trusted healthcare network',
        description: 'Verified clinicians, accredited labs and licensed pharmacies.'
    },
    {
        title: 'Digital prescriptions',
        description: 'QR-verifiable e-prescriptions that travel with the patient.'
    },
    {
        title: 'Laboratory integration',
        description: 'Book tests, get samples collected at home, view digital reports.'
    },
    {
        title: 'Pharmacy integration',
        description: 'Order from your prescription with one tap.'
    },
    {
        title: 'Fast medicine delivery',
        description: 'Same-day delivery across Kerala, expanding nationwide.'
    }
]

const WhyDoclyra = () => {
    return (
        <div className='py-16'>
            <div className='text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>Why Doclyra</p>
                <h2 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Built for trust. Designed for everyone.</h2>
            </div>

            <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {features.map((feature, index) => (
                    <div key={index} className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                        <p className='font-serif text-lg text-ink dark:text-slate-100'>{feature.title}</p>
                        <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WhyDoclyra
