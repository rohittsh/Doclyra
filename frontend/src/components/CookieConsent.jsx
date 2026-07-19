import React, { useEffect, useState } from 'react'

const CookieConsent = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const choice = localStorage.getItem('cookieConsent')
        if (!choice) {
            setVisible(true)
        }
    }, [])

    const respond = (choice) => {
        localStorage.setItem('cookieConsent', choice)
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className='fixed bottom-0 left-0 right-0 z-30 border-t border-[#DDE4F0] dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-4 sm:px-10'>
            <div className='mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between'>
                <p className='text-sm text-slate-brand dark:text-slate-400'>We use cookies to enhance your experience and analyze site usage. By continuing, you agree to our cookie policy.</p>
                <div className='flex flex-shrink-0 items-center gap-3'>
                    <button onClick={() => respond('declined')} className='rounded-full border border-[#DDE4F0] dark:border-slate-600 px-5 py-2 text-sm text-ink dark:text-slate-200'>Decline</button>
                    <button onClick={() => respond('accepted')} className='rounded-full bg-primary px-5 py-2 text-sm text-white'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default CookieConsent
