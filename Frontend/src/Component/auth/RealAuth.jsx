import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function RealAuth() {
    const isLoggedin = localStorage.getItem('isLoggedIn')
    return isLoggedin ? <Outlet /> : <Navigate to='/auth/signup' />
}

export default RealAuth
