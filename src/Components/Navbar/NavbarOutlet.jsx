import React from 'react'
import { Outlet, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from '../Footer/Footer'


const NavbarOutlet = () => {
  return (
     <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default NavbarOutlet