import React from 'react';
import { FaTruck, FaTools, FaHardHat, FaCogs, FaRoad, FaWrench } from 'react-icons/fa';
import '../User.css';
// import jcbimg from "../photo/crane.png";

const Services = () => {  

 const servicesData = [
  {
    icon: <FaTruck style={{ color: "#f39c12",fontSize:"40px"   }} />,
    title: "JCB Excavator",
    desc: "High-performance excavation for foundations, trenching, and large-scale construction projects"
  },
  {
    icon: <FaTools style={{ color: "#e74c3c" , fontSize:"40px" }} />,
    title: "Hydraulic Crane",
    desc: "Precision lifting solutions for heavy materials with maximum safety and control"
  },
  {
    icon: <FaHardHat style={{ color: "#2ecc71",fontSize:"40px"  }} />,
    title: "Bulldozer",
    desc: "Heavy-duty earthmoving and land clearing for tough terrains and site preparation"
  },
  {
    icon: <FaCogs style={{ color: "#3498db",fontSize:"40px"  }} />,
    title: "Loader Machine",
    desc: "Fast and efficient loading, unloading, and material handling operations"
  },
  {
    icon: <FaRoad style={{ color: "#9b59b6",fontSize:"40px"  }} />,
    title: "Road Roller",
    desc: "Advanced compaction technology for smooth, durable road surfaces"
  },
  {
    icon: <FaWrench style={{ color: "#e67e22",fontSize:"40px"  }} />,
    title: "Dump Truck",
    desc: "Reliable transport of sand, gravel, and construction materials across sites"
  },
];

  return (
    <div className="ServicesInS">
     <div className="headindS">
         <h1>Our  Services</h1>
         <span className='borderLine' ></span>
     </div>

      <div className="ServicesBoxes">
        {servicesData.map((item, index) => (
          <div className="serviceBox" key={index}>
            <div className="icon">{item.icon}</div>
            <div className="allItems">
              <h4 className='h3inItems' >{item.title}</h4>
            <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services