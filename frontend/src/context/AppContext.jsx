import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { doctors as fallbackDoctors } from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const [reminders, setReminders] = useState([])

    // Getting Doctors using API
    const getDoctosData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success && Array.isArray(data.doctors) && data.doctors.length > 0) {
                setDoctors(data.doctors)
            } else {
                setDoctors(fallbackDoctors)
            }

        } catch (error) {
            console.log(error)
            setDoctors(fallbackDoctors)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getDoctosData()
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
            const getReminders = async () => {
                try {
                    const { data } = await axios.get(backendUrl + '/api/user/reminders', { headers: { token } })
                    if (data.success) {
                        setReminders(data.appointments)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getReminders()
        }
    }, [token])

    const value = {
        doctors, getDoctosData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData,
        theme, setTheme,
        reminders, setReminders
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider