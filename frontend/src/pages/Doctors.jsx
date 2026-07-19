import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const normalizeSpeciality = (value = '') =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '').replace(/s$/, '')

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityOnly, setAvailabilityOnly] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')

  const specialityOptions = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const visibleDoctors = useMemo(() => {
    const normalizedSpeciality = speciality?.trim()
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const filteredDoctors = doctors.filter((doc) => {
      const docSpeciality = doc.speciality?.trim()
      const matchesSpeciality = normalizedSpeciality
        ? normalizeSpeciality(docSpeciality) === normalizeSpeciality(normalizedSpeciality)
        : true
      const matchesSearch = !normalizedSearch || [doc.name, doc.speciality].some((value) =>
        value?.toLowerCase().includes(normalizedSearch)
      )
      const matchesAvailability = availabilityOnly ? doc.available : true

      return matchesSpeciality && matchesSearch && matchesAvailability
    })

    const sortedDoctors = [...filteredDoctors]

    if (sortBy === 'price-low') {
      sortedDoctors.sort((a, b) => a.fees - b.fees)
    } else if (sortBy === 'price-high') {
      sortedDoctors.sort((a, b) => b.fees - a.fees)
    } else if (sortBy === 'availability') {
      sortedDoctors.sort((a, b) => Number(b.available) - Number(a.available))
    } else if (sortBy === 'name') {
      sortedDoctors.sort((a, b) => a.name.localeCompare(b.name))
    }

    return sortedDoctors
  }, [doctors, speciality, searchTerm, availabilityOnly, sortBy])

  const resetFilters = () => {
    setSearchTerm('')
    setAvailabilityOnly(false)
    setSortBy('recommended')
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-8'>
      <div className='mb-6'>
        <p className='text-sm font-medium text-primary'>Find the right specialist</p>
        <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-slate-100 mt-2'>Browse trusted doctors</h1>
        <p className='text-gray-600 dark:text-slate-400 max-w-2xl mt-2'>Search by name or specialty, filter available doctors, and sort by the option that fits your visit best.</p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border dark:border-slate-700 rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : 'dark:text-slate-200'}`}>Filters</button>

        <div className={`w-full sm:w-72 flex-col gap-4 text-sm text-gray-600 dark:text-slate-300 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search by name or specialty'
            className='w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 rounded-lg px-3 py-2 outline-none focus:border-primary'
          />

          <label className='flex items-center gap-2 border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={availabilityOnly}
              onChange={(e) => setAvailabilityOnly(e.target.checked)}
              className='accent-primary'
            />
            <span>Available doctors only</span>
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 outline-none focus:border-primary'
          >
            <option value='recommended'>Recommended</option>
            <option value='name'>Name A-Z</option>
            <option value='price-low'>Fees: Low to High</option>
            <option value='price-high'>Fees: High to Low</option>
            <option value='availability'>Availability</option>
          </select>

          <button onClick={resetFilters} className='text-left text-primary font-medium'>Clear filters</button>

          <div className='flex flex-col gap-2'>
            {specialityOptions.map((option) => (
              <p
                key={option}
                onClick={() => {
                  setShowFilter(false)
                  speciality === option ? navigate('/doctors') : navigate(`/doctors/${option}`)
                }}
                className={`w-full pl-3 py-1.5 pr-16 border border-gray-300 dark:border-slate-700 rounded transition-all cursor-pointer ${speciality === option ? 'bg-[#E2E5FF] text-black dark:bg-slate-800 dark:text-slate-100' : ''}`}
              >
                {option}
              </p>
            ))}
          </div>
        </div>

        <div className='w-full'>
          <div className='mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <p className='text-sm text-gray-600 dark:text-slate-400'>
              {speciality ? `${speciality} specialists` : 'All specialists'} • {visibleDoctors.length} doctor{visibleDoctors.length === 1 ? '' : 's'} found
            </p>
            {speciality && (
              <button onClick={() => navigate('/doctors')} className='text-sm text-primary font-medium'>Show all doctors</button>
            )}
          </div>

          {visibleDoctors.length > 0 ? (
            <div>
              {speciality && (
                <div className='mb-4 rounded-xl border border-[#E2E8FF] bg-[#F7F9FF] px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'>
                  Showing doctors for <span className='font-semibold text-primary'>{speciality}</span>
                </div>
              )}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6'>
                {visibleDoctors.map((item, index) => (
                  <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='animate-float-in border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 dark:border-slate-700 dark:bg-slate-900' key={index}>
                    <img className='bg-[#EAEFFF] dark:bg-slate-800 w-full h-56 object-cover' src={item.image} alt={item.name} />
                    <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 rounded-full bg-green-500'></p>
                        <p>Available</p>
                      </div>
                      <p className='text-ink dark:text-slate-100 text-lg font-medium mt-2'>{item.name}</p>
                      <p className='text-slate-brand dark:text-slate-400 text-sm'>{item.speciality}</p>
                      <p className='text-sm text-gray-600 dark:text-slate-400 mt-2'>Consultation fee: ₹{item.fees}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='border border-dashed border-gray-300 dark:border-slate-700 rounded-xl p-8 text-center text-gray-600 dark:text-slate-400'>
              No doctors match your current filters. Try adjusting the search or clearing the filters.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
