import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import GuestAuth from './Component/auth/GuestAuth'
import Login from './Component/auth/Login'
import Regsiter from './Component/auth/Regsiter'
import RealAuth from './Component/auth/RealAuth'
import Home from './Component/other/Home'
import Layout from './Layout'
import AddContact from './Component/other/Contact Add/AddContact'
import Profile from './Component/other/User Profile/profile'
import FavoriteSection from './Component/other/Favorite/favoriteSection'
// import Nav from './Component/other/Navbar/Nav'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>

          <Route index element={<Navigate to="/home" replace />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/signup' element={<Regsiter />} />

          <Route element={<><RealAuth /></>}>
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='addContact' element={<AddContact />} />
            <Route path='myfavorite' element={<FavoriteSection />} />
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
