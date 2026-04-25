import React, { useState } from 'react'
import '../Navbar/Navbar.css'
import '../Home/Home.css'
import { useAuth0 } from "@auth0/auth0-react";
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

  // =====================================Log out =====================================

  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  const [menuOpen, setMenuOpen] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const handleToggle = () => {
    setShowProfile((prev) => !prev);
  };

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


        <div className="relative">
          <div
            onClick={handleToggle}
            className="list-none cursor-pointer"
          >
            <img
              className="profile_btn_pic"
              src={user?.picture}
              alt={user?.name}
            />
          </div>

          <div className={`profile-dropdown ${showProfile ? "active" : ""}`}>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
               <button className='btn_pr' onClick={logout}>Logout</button>
          </div>
          <div className="hidden">
             <pre className='preee' >{user?.name}</pre>
            <pre className='preee' >{user?.email}</pre>
            <button className='btn_pr' onClick={logout}>Logout</button>
          </div>
        </div>

      </div>
      <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </div>
  )
}

export default Navbar