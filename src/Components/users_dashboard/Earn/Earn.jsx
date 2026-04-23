import React from 'react'
import "../Earn/earn.css"
import img from "../../photo/truck.png"
import { Link } from 'react-router-dom'
const Earn = () => {
  return (
<>
<div className="earnwithus">
    <div className="imgInearn">
        <img src={img} alt="" />
    </div>
    <div className="contentInearn">
            <h1>Partner With Us & Grow Your Income</h1>
            <p>wn a JCB, crane, or truck? Connect with us and get access to regular construction contracts. We help you find work, you focus on delivering.</p>
            <Link to={"/join"} ><button>Join Now</button></Link>

    </div>
</div>
</>
  )
}

export default Earn