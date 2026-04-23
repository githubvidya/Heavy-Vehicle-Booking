import React from 'react'

const Contact = () => {
  return (
<div className="contactSection">
       <div className="boxInChoose headindS ">
         <h1>Career</h1>
         <span className='borderLine' ></span>
     </div>
   <p className="contactSubtitle">
        Have questions or need help with your booking? Our team is here to assist you anytime.
      </p>
      <div className="contactContainer">
        <div className="contactInfo">
          <h3>Get in Touch</h3>
          <p>📍 Zamania, Uttar Pradesh, India</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 support@vehicle.com</p>
        </div>

        <form className="contactForm">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="contactBtn">
            Send Message
          </button>
        </form>
      </div>
    </div>

  )
}

export default Contact