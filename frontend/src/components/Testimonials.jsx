import React from 'react'

const testimonials = [
    {
        quote: "Booked a consultation, got my prescription and medicines delivered the same evening. Brilliant.",
        name: 'Aisha R.',
        role: 'Patient, Kannur'
    },
    {
        quote: "The cleanest telemedicine workflow I've used. My patients love the simplicity.",
        name: 'Dr. Vinod Menon',
        role: 'General Physician'
    },
    {
        quote: 'Home collection requests routed through Doclyra have grown our reach across Kannur.',
        name: 'PrimeLab Diagnostics',
        role: 'Lab Partner'
    },
    {
        quote: 'Felt premium and reassuring at every step. Care that actually feels like care.',
        name: 'Sreelakshmi K.',
        role: 'Patient, Kochi'
    },
    {
        quote: 'Daily prescription orders without phone calls. Operations have never been smoother.',
        name: 'MediCare Pharmacy',
        role: 'Pharmacy Partner'
    },
    {
        quote: "Our employees finally use their health benefit because it's actually convenient.",
        name: 'Lyra Tech Pvt Ltd',
        role: 'Corporate Client'
    }
]

const Testimonials = () => {
    return (
        <div className='py-16'>
            <div className='text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>Testimonials</p>
                <h2 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Loved by patients, trusted by partners</h2>
            </div>

            <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className='flex flex-col justify-between rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                        <p className='font-serif text-base leading-relaxed text-ink dark:text-slate-100'>"{testimonial.quote}"</p>
                        <div className='mt-5'>
                            <p className='text-sm font-medium text-ink dark:text-slate-100'>{testimonial.name}</p>
                            <p className='text-xs text-slate-brand dark:text-slate-400'>{testimonial.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials
