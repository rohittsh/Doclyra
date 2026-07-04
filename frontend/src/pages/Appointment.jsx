import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [reviews, setReviews] = useState([])
    const [reviewText, setReviewText] = useState('')
    const [reviewRating, setReviewRating] = useState(5)
    const [loadingReviews, setLoadingReviews] = useState(false)
    const [submittingReview, setSubmittingReview] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)

    const navigate = useNavigate()

    const fetchReviews = async () => {
        if (!docId) return
        try {
            setLoadingReviews(true)
            const { data } = await axios.get(backendUrl + '/api/user/reviews', { headers: { token }, params: { doctorId: docId } })
            if (data.success) {
                setReviews(data.reviews)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingReviews(false)
        }
    }

    const submitReview = async () => {
        if (!token) {
            toast.warning('Login to leave a review')
            return navigate('/login')
        }
        if (!reviewText.trim()) {
            toast.warning('Please add a short review')
            return
        }

        try {
            setSubmittingReview(true)
            const { data } = await axios.post(backendUrl + '/api/user/add-review', { doctorId: docId, rating: reviewRating, comment: reviewText }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                setReviewText('')
                setReviewRating(5)
                await fetchReviews()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setSubmittingReview(false)
        }
    }

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        if (!docInfo) return

        setDocSlots([])
        setSlotTime('')
        setSlotIndex(0)

        const bookedSlots = docInfo.slots_booked || {}
        const generatedSlots = []
        const today = new Date()

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            const endTime = new Date(today)
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            const timeSlots = []
            let slotCursor = new Date(currentDate)

            while (slotCursor < endTime) {
                const formattedTime = slotCursor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                const day = slotCursor.getDate()
                const month = slotCursor.getMonth() + 1
                const year = slotCursor.getFullYear()
                const slotDate = day + '_' + month + '_' + year
                const bookedForDate = bookedSlots[slotDate] || []
                const isSlotAvailable = !bookedForDate.includes(formattedTime)

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(slotCursor),
                        time: formattedTime
                    })
                }

                slotCursor.setMinutes(slotCursor.getMinutes() + 30)
            }

            generatedSlots.push(timeSlots)
        }

        setDocSlots(generatedSlots)

        const firstAvailableDay = generatedSlots.findIndex((daySlots) => daySlots.length > 0)
        if (firstAvailableDay !== -1) {
            setSlotIndex(firstAvailableDay)
            setSlotTime(generatedSlots[firstAvailableDay][0].time)
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!docInfo || !docSlots.length || !slotTime) {
            toast.warning('Please choose an available time slot')
            return
        }

        const selectedDaySlots = docSlots[slotIndex] || []
        const selectedSlot = selectedDaySlots.find((item) => item.time === slotTime)

        if (!selectedSlot) {
            toast.warning('Please choose an available time slot')
            return
        }

        const date = selectedSlot.datetime
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const slotDate = day + '_' + month + '_' + year

        try {
            setBookingLoading(true)
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {
                docId,
                slotDate,
                slotTime: selectedSlot.time,
                doctorData: {
                    _id: docInfo?._id,
                    name: docInfo?.name,
                    image: docInfo?.image,
                    speciality: docInfo?.speciality,
                    degree: docInfo?.degree,
                    experience: docInfo?.experience,
                    about: docInfo?.about,
                    fees: docInfo?.fees,
                    address: docInfo?.address,
                    available: true
                }
            }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setBookingLoading(false)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
            fetchReviews()
        }
    }, [docInfo])

    return docInfo ? (
        <div>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span> </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p >Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>

                <button onClick={bookAppointment} disabled={bookingLoading} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6 disabled:cursor-not-allowed disabled:opacity-70'>
                    {bookingLoading ? 'Booking...' : 'Book an appointment'}
                </button>
            </div>

            <div className='mt-8 rounded-2xl border border-[#E3E8FF] bg-white p-5 shadow-sm'>
                <div className='flex items-center justify-between gap-3'>
                    <div>
                        <p className='text-lg font-semibold text-gray-800'>Patient reviews</p>
                        <p className='text-sm text-gray-600'>Share your experience and help others choose confidently.</p>
                    </div>
                    <div className='rounded-full bg-[#EAEFFF] px-3 py-1 text-sm font-medium text-primary'>⭐ {reviews.length} reviews</div>
                </div>

                <div className='mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
                    <div className='space-y-3'>
                        {loadingReviews ? (
                            <div className='animate-pulse space-y-3'>
                                <div className='h-16 rounded-lg bg-gray-100' />
                                <div className='h-16 rounded-lg bg-gray-100' />
                            </div>
                        ) : reviews.length > 0 ? reviews.slice(0, 3).map((item, index) => (
                            <div key={index} className='rounded-xl border border-gray-200 p-3'>
                                <div className='flex items-center justify-between'>
                                    <p className='font-medium text-gray-800'>{item.userName}</p>
                                    <p className='text-sm text-primary'>{'★'.repeat(item.rating)}</p>
                                </div>
                                <p className='mt-2 text-sm text-gray-600'>{item.comment}</p>
                            </div>
                        )) : (
                            <p className='text-sm text-gray-500'>No reviews yet. Be the first to share your experience.</p>
                        )}
                    </div>

                    <div className='rounded-xl border border-dashed border-gray-300 p-4'>
                        <p className='font-medium text-gray-800'>Leave a review</p>
                        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows='4' className='mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary' placeholder='How was your visit?' />
                        <div className='mt-3 flex items-center gap-2'>
                            <span className='text-sm text-gray-600'>Rating:</span>
                            <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className='rounded border border-gray-300 px-2 py-1 text-sm'>
                                {[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} ★</option>)}
                            </select>
                        </div>
                        <button onClick={submitReview} disabled={submittingReview} className='mt-4 rounded-full bg-primary px-5 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-70'>
                            {submittingReview ? 'Submitting...' : 'Submit review'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Listing Releated Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
}

export default Appointment