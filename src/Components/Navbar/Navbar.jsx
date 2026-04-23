import React, { useState } from 'react'
import '../Navbar/Navbar.css'
import imgLogo from '../photo/logo.png'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const navItems = [
  { name: "Home", path: "/userD" },
  { name: "About Us", path: "/about" },
  { name: "Safety", path: "/safety" },
  { name: "Careers", path: "/careers" },
  { name: "Press", path: "/press" },
  { name: "Contact Us", path: "/contact" }
];    

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbarInNav">

   
      <div className="logoInnav">
        <img src={imgLogo} alt="logo" className='logo_InNAV' />
        <h6 className='h6'>Vehicle</h6>
      </div>


      <div className={`olInnav ${menuOpen ? "active" : ""}`}>
      <ol>
  {navItems.map((item, index) => (
    <li key={index} onClick={() => setMenuOpen(false)}>
      <Link to={item.path} className="link">
        {item.name}
      </Link>
    </li>
  ))}
</ol>
      </div>

 
      <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </div>
  )
}

export default Navbar