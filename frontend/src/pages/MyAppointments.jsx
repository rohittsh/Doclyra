// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const MyAppointments = () => {

//     const { backendUrl, token } = useContext(AppContext)
//     const navigate = useNavigate()

//     const [appointments, setAppointments] = useState([])
//     const [payment, setPayment] = useState('')
//     const [analytics, setAnalytics] = useState(null)
//     const [calendarDays, setCalendarDays] = useState([])

//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
//     const slotDateFormat = (slotDate) => {
//         const dateArray = slotDate.split('_')
//         return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//     }

//     // Getting User Appointments Data Using API
//     const getUserAppointments = async () => {
//         try {

//             const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
//             setAppointments(data.appointments.reverse())

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     const getPaymentAnalytics = async () => {
//         try {
//             const { data } = await axios.get(backendUrl + '/api/user/payment-analytics', { headers: { token } })
//             if (data.success) {
//                 setAnalytics(data.analytics)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const sendReminder = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(backendUrl + '/api/user/send-reminder', { appointmentId }, { headers: { token } })
//             if (data.success) {
//                 toast.success(data.message)
//                 getUserAppointments()
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     // Function to cancel appointment Using API
//     const cancelAppointment = async (appointmentId) => {

//         try {

//             const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

//             if (data.success) {
//                 toast.success(data.message)
//                 getUserAppointments()
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }

//     }

//     const initPay = (order) => {
//         const options = {
//             key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//             amount: order.amount,
//             currency: order.currency,
//             name: 'Appointment Payment',
//             description: "Appointment Payment",
//             order_id: order.id,
//             receipt: order.receipt,
//             handler: async (response) => {

//                 console.log(response)

//                 try {
//                     const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
//                     if (data.success) {
//                         navigate('/my-appointments')
//                         getUserAppointments()
//                     }
//                 } catch (error) {
//                     console.log(error)
//                     toast.error(error.message)
//                 }
//             }
//         };
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };

//     // Function to make payment using razorpay
//     const appointmentRazorpay = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
//             if (data.success) {
//                 initPay(data.order)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     // Function to make payment using stripe
//     const appointmentStripe = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
//             if (data.success) {
//                 const { session_url } = data
//                 window.location.replace(session_url)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }



//     useEffect(() => {
//         if (token) {
//             getUserAppointments()
//             getPaymentAnalytics()
//             const nextDays = Array.from({ length: 7 }, (_, index) => {
//                 const date = new Date()
//                 date.setDate(date.getDate() + index)
//                 return date.toLocaleDateString('en', { weekday: 'short', day: 'numeric' })
//             })
//             setCalendarDays(nextDays)
//         }
//     }, [token])

//     return (
//         <div>
//             <div className='mt-8 rounded-2xl border border-blue-100 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 p-5 shadow-sm'>
//                 <p className='text-sm font-semibold uppercase tracking-[0.3em] text-primary'>Care plan</p>
//                 <h2 className='mt-2 text-2xl font-semibold text-gray-800 dark:text-slate-100'>Stay ahead of every visit</h2>
//                 <p className='mt-2 text-sm text-gray-600 dark:text-slate-400'>Get reminders, track upcoming care days, and review your payment history in one place.</p>
//             </div>

//             <div className='mt-6 grid gap-4 lg:grid-cols-3'>
//                 <div className='rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4'>
//                     <p className='text-sm text-gray-500 dark:text-slate-400'>Total paid</p>
//                     <p className='mt-2 text-2xl font-semibold text-gray-800 dark:text-slate-100'>₹{analytics?.totalPaid || 0}</p>
//                 </div>
//                 <div className='rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4'>
//                     <p className='text-sm text-gray-500 dark:text-slate-400'>Payments made</p>
//                     <p className='mt-2 text-2xl font-semibold text-gray-800 dark:text-slate-100'>{analytics?.paidCount || 0}</p>
//                 </div>
//                 <div className='rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4'>
//                     <p className='text-sm text-gray-500 dark:text-slate-400'>Upcoming care window</p>
//                     <div className='mt-2 flex flex-wrap gap-2'>
//                         {calendarDays.map((day, index) => (
//                             <span key={index} className='rounded-full bg-gray-100 dark:bg-slate-800 px-3 py-1 text-sm text-gray-700 dark:text-slate-300'>{day}</span>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <p className='pb-3 mt-8 text-lg font-medium text-gray-600 dark:text-slate-300 border-b dark:border-slate-700'>My appointments</p>
//             <div className=''>
//                 {appointments.map((item, index) => (
//                     <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b dark:border-slate-700'>
//                         <div>
//                             <img className='w-36 bg-[#EAEFFF] dark:bg-slate-800' src={item.docData.image} alt="" />
//                         </div>
//                         <div className='flex-1 text-sm text-slate-brand dark:text-slate-400'>
//                             <p className='text-ink dark:text-slate-100 text-base font-semibold'>{item.docData.name}</p>
//                             <p>{item.docData.speciality}</p>
//                             <p className='text-slate-brand dark:text-slate-300 font-medium mt-1'>Address:</p>
//                             <p className=''>{item.docData.address.line1}</p>
//                             <p className=''>{item.docData.address.line2}</p>
//                             <p className=' mt-1'><span className='text-sm text-ink dark:text-slate-300 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
//                         </div>
//                         <div></div>
//                         <div className='flex flex-col gap-2 justify-end text-sm text-center'>
//                             {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
//                             {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentStripe(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" /></button>}
//                             {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
//                             {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border dark:border-slate-600 rounded text-slate-brand dark:text-slate-300 bg-[#EAEFFF] dark:bg-slate-800'>Paid</button>}
//                             {!item.cancelled && item.payment && !item.isCompleted && <button onClick={() => navigate(`/video-call/${item._id}`)} className='sm:min-w-48 py-2 border rounded text-white bg-primary hover:bg-primary/90 transition-all duration-300'>Join Video Call</button>}

//                             {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

//                             {!item.cancelled && !item.isCompleted && <button onClick={() => sendReminder(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Send reminder</button>}
//                             {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
//                             {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default MyAppointments


import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [analytics, setAnalytics] = useState(null)
    const [calendarDays, setCalendarDays] = useState([])

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getPaymentAnalytics = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/payment-analytics', { headers: { token } })
            if (data.success) {
                setAnalytics(data.analytics)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendReminder = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/send-reminder', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            // Force a dedicated "Pay using UPI QR Code" block to show up front,
            // instead of it being buried inside the general UPI tab.
            config: {
                display: {
                    blocks: {
                        qrBlock: {
                            name: 'Pay using UPI QR Code',
                            instruments: [
                                {
                                    method: 'upi',
                                    flows: ['qr']
                                }
                            ]
                        }
                    },
                    sequence: ['block.qrBlock', 'block.other'],
                    preferences: {
                        show_default_blocks: true
                    }
                }
            },
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
            getPaymentAnalytics()
            const nextDays = Array.from({ length: 7 }, (_, index) => {
                const date = new Date()
                date.setDate(date.getDate() + index)
                return date.toLocaleDateString('en', { weekday: 'short', day: 'numeric' })
            })
            setCalendarDays(nextDays)
        }
    }, [token])

    return (
        <div>
            <div className='mt-8 rounded-2xl border border-blue-100 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 p-5 shadow-sm'>
                <p className='text-sm font-semibold uppercase tracking-[0.3em] text-primary'>Care plan</p>
                <h2 className='mt-2 text-2xl font-semibold text-gray-800 dark:text-slate-100'>Stay ahead of every visit</h2>
                <p className='mt-2 text-sm text-gray-600 dark:text-slate-400'>Get reminders, track upcoming care days, and review your payment history in one place.</p>
            </div>

            <div className='mt-6 grid gap-4 lg:grid-cols-3'>
                <div className='rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4'>
                    <p className='text-sm text-gray-500 dark:text-slate-400'>Total paid</p>
                    <p className='mt-2 text-2xl font-semibold text-gray-800 dark:text-slate-100'>₹{analytics?.totalPaid || 0}</p>
                </div>
                <div className='rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4'>
                    <p className='text-sm text-gray-500 dark:text-slate-400'>Payments made</p>
                    <p className='mt-2 text-2xl font-semibold text-gray-800 dark:text-slate-100'>{analytics?.paidCount || 0}</p>
                </div>
                <div className='rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4'>
                    <p className='text-sm text-gray-500 dark:text-slate-400'>Upcoming care window</p>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        {calendarDays.map((day, index) => (
                            <span key={index} className='rounded-full bg-gray-100 dark:bg-slate-800 px-3 py-1 text-sm text-gray-700 dark:text-slate-300'>{day}</span>
                        ))}
                    </div>
                </div>
            </div>

            <p className='pb-3 mt-8 text-lg font-medium text-gray-600 dark:text-slate-300 border-b dark:border-slate-700'>My appointments</p>
            <div className=''>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b dark:border-slate-700'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF] dark:bg-slate-800' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-slate-brand dark:text-slate-400'>
                            <p className='text-ink dark:text-slate-100 text-base font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-slate-brand dark:text-slate-300 font-medium mt-1'>Address:</p>
                            <p className=''>{item.docData.address.line1}</p>
                            <p className=''>{item.docData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-ink dark:text-slate-300 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentStripe(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" /></button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border dark:border-slate-600 rounded text-slate-brand dark:text-slate-300 bg-[#EAEFFF] dark:bg-slate-800'>Paid</button>}
                            {!item.cancelled && item.payment && !item.isCompleted && <button onClick={() => navigate(`/video-call/${item._id}`)} className='sm:min-w-48 py-2 border rounded text-white bg-primary hover:bg-primary/90 transition-all duration-300'>Join Video Call</button>}

                            {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

                            {!item.cancelled && !item.isCompleted && <button onClick={() => sendReminder(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Send reminder</button>}
                            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-slate-brand dark:text-slate-300 dark:border-slate-600 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments