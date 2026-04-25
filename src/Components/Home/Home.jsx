import React, { useState } from 'react'
import '../Home/Home.css';
import { useAuth0 } from "@auth0/auth0-react";
import img from '../photo/logo.png'
import { FaUser } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";
import Slider from './Slider';
import {Link} from 'react-router-dom'   
const Home = () => {


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





    const [profilebox, setprofilebox] = useState(false)

    const boxopen = () => {
        setprofilebox(!profilebox)
    }

    return (
        <>
            <div className="optinal">
                <aside className='aside_' >
                    <nav className='navbar ' >

                        <h6 className='logo_name h6'>Vehicle</h6>

                        <div className="profile_box">
                            {
                                isAuthenticated ? (
                                    <button className='profile_btn' onClick={boxopen}>
                                        <img className='profile_btn_pic' src={user?.picture} alt="" />
                                    </button>
                                ) : (
                                    <button className='profile_btn Login_btn' onClick={boxopen}>
                                        Login
                                    </button>
                                )
                            }


                            {profilebox && (<div className='open_profile'>

                                <button className='profile_btn open_btn' onClick={boxopen}>
                                    <HiArrowLeftStartOnRectangle size={30} />
                                </button>
                                <div className="content_openbox">

                                    {isAuthenticated ? (
                                        <>

                                            <div className="allditels">
                                                <div className="profile_ditals">
                                                    <span className='span_p' ><img className='image_in_id' src={user?.picture} alt="img" />{user.nickname}</span>
                                                </div>
                                                <pre className='pre' >{user?.email}</pre>
                                                <button className='btn_pr' onClick={logout}>Logout</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {error && <p>Error: {error.message}</p>}

                                            <div className="login_handle">
                                                <p>Welcome! Choose your role—owner or user—to explore, list vehicles, book services, and enjoy a smooth, fast experience tailored for you.</p>
                                                <button onClick={signup}>Signup</button>

                                                <button onClick={login}>Login</button>
                                            </div>
                                        </>
                                    )}

                                </div>
                            </div>
                            )}
                        </div>

                    </nav>

                    <div className="logo_main">
                        <img src={img} alt="logo" className='logo' />
                        <h5 className='logo_name'>Vehicle</h5>
                    </div>

                    <p className='p' >
                        Our platform connects customers who need heavy construction vehicles with verified vehicle owners. Customers can easily request equipment like Dumper,  JCB, or Crane for their work. Vehicle owners can register their machines, receive job requests, and earn by providing reliable construction and transport services in their nearby areas.
                    </p>

                    {
                        isAuthenticated ? (
                            <div className="owner_customers">
                                <Link to="userD" ><button className='customer_btn btn'>
                                    <FaUser size={15} /> User
                                </button>
                                </Link>

                               <Link to="VehicleD" >
                                <button className='btn'>
                                    <FaCar size={17} color="black" /> Vehicle Owner
                                </button>
                               </Link>
                            </div>
                        ) : (
                            <div className="owner_customers">
                                <p className='login_to_contine' >please Login to contine...</p>
                                <button className='customer_btn btn'>
                                    <FaUser size={15} /> User
                                </button>

                                <button className='btn'>
                                    <FaCar size={17} color="black" /> Vehicle Owner
                                </button>
                            </div>
                        )
                    }

                </aside>
                <div className="sideImage">
                   <Slider/>
                </div>
            </div>
        </>
    )
}

export default Home