import React from 'react'
import {Link} from "react-router-dom"

const ViewJobs = () => {
  return (
    <>
    <div className="job">
        <p>Sorry, there are currently no job openings available in this area. Please check back later.</p>
        <Link to={"/careers"} >
      <button className='btnIncareer' >Back</button>
      </Link>
    </div>
    </>
  )
}

export default ViewJobs