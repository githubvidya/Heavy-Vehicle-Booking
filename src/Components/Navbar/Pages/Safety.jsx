import React, { useState } from "react";
import SafetyCustomers from "./SeftyOverviews/SafetyCustomers";
import SafetyOverview from "./SeftyOverviews/SafetyOverview";
import SafetyOwners from "./SeftyOverviews/SafetyOwners"
import "../Navbar.css"
const threeOptions = [
  { name: "Safety Overview", type: "overview" },
  { name: "Safety for Customers", type: "customers" },
  { name: "Safety for Vehicle Owners", type: "owners" }
];

const Safety = () => {
  const [active, setActive] = useState("overview");

  return (
    <div className="sefty">
      <div className="seftySection">

         <div className="boxInChoose headindS ">
         <h1>Safety</h1>
         <span className='borderLine' ></span>
     </div>

        <ol className="olInSefty" >
          {threeOptions.map((item, i) => (
            <li key={i}>
              <button onClick={() => setActive(item.type)}>
                {item.name}
              </button>
            </li>
          ))}
        </ol>

        <div className="SectionsOfSefty">
          {active === "overview" && <SafetyOverview />}
          {active === "customers" && <SafetyCustomers />}
          {active === "owners" && <SafetyOwners/>}
        </div>

      </div>
    </div>
  );
};

export default Safety;