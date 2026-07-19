import React, { useState } from 'react'

const faqs = [
    {
        question: 'Is Doclyra available across Kerala?',
        answer: "Yes. We're live across Kannur and Kochi today, with same-day medicine delivery in both cities, and we're expanding to more Kerala districts and other states through the rest of the year."
    },
    {
        question: 'Are my health records secure?',
        answer: 'Your records, prescriptions and lab reports are encrypted and only visible to you and the clinicians you choose to share them with. We never sell or share patient data with advertisers.'
    },
    {
        question: 'Can my clinic or pharmacy partner with Doclyra?',
        answer: 'Yes — clinics, diagnostic labs and pharmacies can all join the network. Write to us at hello@doclyra.com with your registration details and our partnerships team will get in touch.'
    },
    {
        question: 'Do you accept corporate health plans?',
        answer: "Yes. Doclyra for Corporate covers annual checkups, on-site clinic days and an HR dashboard for tracking usage. Visit our Corporate page or email corporate@doclyra.in to set one up for your team."
    }
]

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className='py-16'>
            <div className='text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>FAQ</p>
                <h2 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Frequently asked questions</h2>
            </div>

            <div className='mt-10 max-w-2xl mx-auto divide-y divide-[#DDE4F0] dark:divide-slate-700 rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900'>
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <button
                            onClick={() => toggle(index)}
                            className='flex w-full items-center justify-between gap-4 px-6 py-5 text-left'
                        >
                            <span className='font-serif text-base text-ink dark:text-slate-100'>{faq.question}</span>
                            <span className='text-xl text-slate-brand dark:text-slate-400'>{openIndex === index ? '−' : '+'}</span>
                        </button>
                        {openIndex === index && (
                            <p className='px-6 pb-5 text-sm text-slate-brand dark:text-slate-400'>{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQ
