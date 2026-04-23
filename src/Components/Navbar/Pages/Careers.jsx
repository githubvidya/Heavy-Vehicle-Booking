import React from 'react'
import { Link } from "react-router-dom"
import office from "../../photo/Office.jpg"
import officee from "../../photo/Office2.jpg"

const Careers = () => {
  return (
    <>
      <div className="career">
        <div className="boxInChoose headindS ">
          <h1>Career</h1>
          <span className='borderLine' ></span>
        </div>
        <div className="left_right_Career">
          <div className="leftCareer">
            <div className="allcontentCareer">
              <h2>Drive with Us. Grow with Us.</h2>
              <p>Join a trusted network where your work is valued and your efforts are rewarded. We provide a safe and reliable platform for you to find consistent opportunities.</p>
              <h3>Start your journey today.</h3>
              <Link to={"/viewjob"} >
                <button className='btnIncareer' >view jobs</button>
              </Link>
            </div>
          </div>
          <div className="rightCareer">
            <div className="imgcareer">
              <div>
                <img src={office} alt="office" />
              </div>

              <div className="leftT"></div>

              <div className="rightB"></div>
              <div>
                <img src={officee} alt="office" />
              </div>
            </div>
          </div>
        </div>

        <div className="whyWork">
          <h2 className="title">Why Work With Us</h2>
          <p className="subtitle">
            Powering reliable heavy vehicle bookings with trust, efficiency, and scale.
          </p>

          <div className="cardContainer">
            <div className="card">
              <div className="icon">🚛</div>
              <h3>Wide Fleet</h3>
              <p>  Access a large network of heavy vehicles for every transport need, designed to provide flexibility, scalability, and reliable transportation solutions for businesses of all sizes.</p>
            </div>

            <div className="card">
              <div className="icon">⚡</div>
              <h3>Fast Booking</h3>
              <p>Book trucks instantly with a smooth and simple process, ensuring fast booking, reliable availability, and a hassle-free experience from start to finish.</p>
            </div>

            <div className="card">
              <div className="icon">🔒</div>
              <h3>Trusted & Secure</h3>
              <p> Your goods are handled safely with verified drivers, providing trusted, secure, and professional transport services to guarantee peace of mind throughout the journey.</p>
            </div>

            <div className="card">
              <div className="icon">💰</div>
              <h3>Best Pricing</h3>
              <p>Get competitive rates with no hidden charges, providing transparent pricing, budget-friendly options, and complete confidence in every booking you make.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Careers