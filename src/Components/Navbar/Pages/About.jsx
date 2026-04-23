import React from 'react'
import truckF from "../../photo/truckF.png"
import {Link} from "react-router-dom"

const About = () => {
  return (
    <>
    <div className="about">
      <div className="boxInChoose headindS ">
         <h1>About US</h1>
         <span className='borderLine' ></span>
     </div>
      <div className="contentInabout">
         
                <div className="allcontentInone">
                  <h3 className='move' >Move Heavy. Move Smart.</h3>
                <h2>Not just another booking service — the backbone of your business logistics.</h2>
                <p>We power businesses by making heavy vehicle booking fast, affordable, and dependable across India.</p>
                <div className="linkeChooseus">
                  <h2>  Why choose us?</h2>
                  <Link className='link' to={"/MoreAbout"}>more</Link>
                </div>
                <p>From bulky loads to critical deliveries, our network ensures your cargo reaches safely and on schedule. Built for efficiency. Designed for trust.</p>
                </div>
                 <div className="imgInAbout">
<img src={truckF} alt="immage" />
      </div>
      </div>
    </div>
    </>
  )
}

export default About