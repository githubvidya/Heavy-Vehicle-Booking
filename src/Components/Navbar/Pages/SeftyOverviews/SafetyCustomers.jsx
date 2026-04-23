import React from 'react'
import customer from "../../../photo/cus.png"

const SafetyCustomers = () => {
  return (
 <div className="Overview">
  <h1>Safety for Customers</h1>

  <div className="imgandp">
    <p className='firstp'>
      For our customers, safety means complete confidence that their goods are handled with care and delivered without risk. We understand that every shipment carries value, whether it is small or large, and that trust plays a major role in choosing a transport service. That’s why we focus on creating a secure and dependable experience from the very beginning.

      From the moment a booking is confirmed, we ensure that customers are connected only with verified drivers and reliable vehicles. Every detail, including pricing, pickup, and delivery expectations, is clearly communicated to avoid confusion or unexpected issues. Our goal is to make the entire process smooth, transparent, and easy to manage.

      We also prioritize proper handling and timely delivery so that goods reach their destination safely. By maintaining high standards and continuously improving our system, we aim to provide customers with peace of mind and a stress-free transport experience every time they use our platform.
    </p>

    <img src={customer} alt="img" className='cus' />
  </div>

  <p className='secondP'>
    We provide real-time clarity throughout the journey so customers always know the status of their shipments. By reducing uncertainty and ensuring accountability, we help build trust and reliability in every booking.
  </p>

  <p className='thirdP'>
    Our commitment is to make heavy transport simple, safe, and dependable for every customer, so they can focus on their work without worrying about logistics.
  </p>
</div>
  ) 
}

export default SafetyCustomers