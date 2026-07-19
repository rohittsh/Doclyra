import React, { useContext, useMemo } from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const normalizeSpeciality = (value = '') =>
    value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '').replace(/s$/, '')

const SpecialityMenu = () => {
    const { doctors } = useContext(AppContext)

    const doctorsBySpeciality = useMemo(() => {
        const grouped = {}

        doctors.forEach((doc) => {
            const specialityName = doc.speciality?.trim()
            if (!specialityName) return

            const key = normalizeSpeciality(specialityName)
            if (!grouped[key]) grouped[key] = []
            grouped[key].push(doc)
        })

        return grouped
    }, [doctors])

    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-ink dark:text-slate-100'>
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm'>Choose a specialty to explore doctors who match that care area.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto pb-2'>
                {specialityData.map((item, index) => {
                    const specialtyKey = normalizeSpeciality(item.speciality)
                    const specialtyDoctors = doctorsBySpeciality[specialtyKey] || []
                    const previewDoctors = specialtyDoctors.slice(0, 3)

                    return (
                        <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='flex min-w-[180px] flex-col items-start text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 rounded-2xl border border-[#E2E8FF] bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900' key={index}>
                            <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
                            <p className='font-medium text-slate-700 dark:text-slate-200'>{item.speciality}</p>
                            <p className='mt-1 text-[11px] text-slate-500 dark:text-slate-400'>View doctors</p>
                            <div className='mt-3 flex w-full flex-col gap-1 border-t border-slate-100 pt-2 dark:border-slate-700'>
                                {previewDoctors.length > 0 ? (
                                    previewDoctors.map((doctor) => (
                                        <p key={doctor._id} className='truncate text-[11px] text-slate-600 dark:text-slate-300'>• {doctor.name}</p>
                                    ))
                                ) : (
                                    <p className='text-[11px] text-slate-400 dark:text-slate-500'>No doctors listed yet</p>
                                )}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default SpecialityMenu