import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function GuestAuth() {

    const isLoggedin = localStorage.getItem('isLoggedIn') === 'true'
    return isLoggedin ? <Navigate to='home' /> : <Outlet />
}

export default GuestAuth
