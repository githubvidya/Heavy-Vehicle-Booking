import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "../users_dashboard/User.css";
import jcb from "../photo/image.png";
import { useNavigate } from "react-router-dom";
import Services from "./Services/Services";
import Earn from "./Earn/Earn";
import Testimonial from "./Testimonial/Testimonial";
import AboutHighlights from "./AboutHighlights/AboutHighlights";

const districts = [
  "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha",
  "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich",
  "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly",
  "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr",
  "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah",
  "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar",
  "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur",
  "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi",
  "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj",
  "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur",
  "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
  "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar",
  "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur",
  "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur",
  "Shamli", "Shravasti", "Siddharthnagar", "Sitapur",
  "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
];

const heavyVehicles = [
  "Truck",
  "Bus",
  "Trailer",
  "Dump Truck",
  "Cement Mixer",
  "Bulldozer",
  "Crane",
  "Excavator"
];

function UserD() {
 const [district, setDistrict] = useState("");
  const [vehicle, setVehicle] = useState("");
  const navigate = useNavigate();

const handleSubmit = async () => {
    try {
      if (!district || !vehicle) {
        alert("Please select both fields");
        return;
      }

     const res = await axios.get(
  `https://heavy-vehicle-booking-production.up.railway.app/search?vehicleName=${vehicle}&district=${district}`
);

      navigate("/searchdata", { state: res.data });

    } catch (err) {
      console.log(err);
      alert("Error fetching data");
    }
  };


  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="landingPage">
        <div className="leftContent">
          <div className="Search">
            <div className="headingSearch">
             <div className="all">
               <span className="No1">India’s #1</span><br />
              <span className="App">Heavy Vehicle App</span><br />
              <span className="Booking">Find Vehicles in Your District</span>
             </div>

              <div className="input">

                <select
                  className="select"
                   value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">-- Select District --</option>
                  {districts.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  className="select"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                >
                  <option value="">-- Select Vehicle --</option>
                  {heavyVehicles.map((v, i) => (
                    <option key={i} value={v}>{v}</option>
                  ))}
                </select>

                <button onClick={handleSubmit} className="subbmitDistrict">
                  Search Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rightContent">
          <div className="imageJCB">
            <img src={jcb} alt="JCB" />
          </div>
        </div>
      </div>
      <div className="ServicesInUserD">
        <Services/>
      </div>
      <div className="EarnInUser">
        <Earn/>
      </div>
      <div className="testimoniall">
              <div className="headindS">
        <h1>Happy Customers</h1>
        <span className="borderLine"></span>
      </div>
        <Testimonial/>
      </div>
      <div className="whyChooseUS">
          <div className="boxInChoose headindS ">
         <h1>Why Choose Us</h1>
         <span className='borderLine' ></span>
     </div>
        <AboutHighlights/>
      </div>
    </>
  );
}

export default UserD;