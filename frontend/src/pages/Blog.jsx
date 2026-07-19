import React from 'react'

const posts = [
    {
        title: 'What to bring to your first specialist visit',
        excerpt: 'A short checklist — past reports, current medication, and the three questions worth writing down before you forget them in the room.',
        date: 'Jun 2026'
    },
    {
        title: 'Reading your own lab report, without the jargon',
        excerpt: 'What CBC, lipid profile, and HbA1c numbers actually mean, and which ranges are worth a follow-up call.',
        date: 'May 2026'
    },
    {
        title: 'When a video consultation is enough, and when it isn\'t',
        excerpt: 'A practical guide to knowing which symptoms are fine over video and which need an in-person exam.',
        date: 'Apr 2026'
    },
    {
        title: 'Building a medication routine that actually sticks',
        excerpt: 'Small changes — same time, same place, a reminder that isn\'t easy to swipe away — that make daily prescriptions easier to keep up with.',
        date: 'Mar 2026'
    }
]

const Blog = () => {
    return (
        <div className='pb-16'>
            <div className='pt-10 text-center'>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-gold'>Doclyra journal</p>
                <h1 className='font-serif mt-3 text-3xl text-ink dark:text-slate-100 sm:text-4xl'>Notes on healthcare, written plainly</h1>
                <p className='mt-4 max-w-2xl mx-auto text-sm text-slate-brand dark:text-slate-400'>Short, practical reads from our clinical team — no jargon, no filler.</p>
            </div>

            <div className='mt-12 grid gap-6 sm:grid-cols-2'>
                {posts.map((post, index) => (
                    <div key={index} className='rounded-2xl border border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 p-6'>
                        <p className='font-mono text-xs text-slate-brand dark:text-slate-400'>{post.date}</p>
                        <p className='font-serif mt-2 text-lg text-ink dark:text-slate-100'>{post.title}</p>
                        <p className='mt-2 text-sm text-slate-brand dark:text-slate-400'>{post.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog
