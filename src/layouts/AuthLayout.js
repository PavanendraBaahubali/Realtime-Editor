import React from 'react'
import '../styles/AuthLayout.css'
import Login from '../components/Login'
import { useLocation } from 'react-router-dom'

const AuthLayout = () => {
    const location = useLocation()
    let authType = new URLSearchParams(location.search);
    authType = authType.toString().slice(0, authType.toString.length - 1);

    return (
    <div className='AuthLayout'>
        {
            authType === 'login' ? <Login name = {'login'} /> : <Login name = {'register'} />
        }
    </div>
  )
}

export default AuthLayout