import React from 'react'
import sefty from "../../../photo/sefty.png"
// import "../../Navbar/Navbar.css"
const SafetyOverview = () => {
  return (
    <>
      <div className="Overview">
        <h1>SeftyOverview</h1>
      <div className="imgandp">
          <p className='firstp' >Safety is at the core of everything we do. We understand that transporting goods is not just about moving items from one place to another — it involves responsibility, trust, and careful handling at every stage. That’s why we have built our platform with a strong focus on ensuring secure and reliable transportation for everyone involved.

          From the moment a booking is confirmed to the final delivery, every step is managed with attention and care. We work with verified drivers and well-maintained vehicles to reduce risks and maintain high safety standards throughout the journey. Our system is designed to provide transparency, so users always know the status of their shipments without uncertainty.

          We also believe that safety is not a one-time effort but a continuous process. By constantly improving our technology and operational practices, we aim to create a dependable environment where both customers and vehicle owners can rely on us with confidence. Our commitment is simple — to make every delivery safe, smooth, and stress-free.4
          </p>
          <img src={sefty} alt="" />
      </div>

        <p className='secondP' >From the moment a booking is placed to the final delivery, we aim to maintain transparency and control. Our system is designed to minimize risks by working only with verified vehicle owners and trained drivers who follow proper safety guidelines. We continuously monitor and improve our processes to ensure that every journey meets our safety standards.</p>
        <p className='thirdP' >Whether it’s a small shipment or a large consignment, our goal is to provide peace of mind. We are committed to creating a safe environment where both customers and vehicle owners can rely on our platform without hesitation.</p>
      </div>
    </>
  )
}

export default SafetyOverview  