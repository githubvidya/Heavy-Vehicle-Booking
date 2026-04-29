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

import "../users_dashboard/User.css";

const districts = [
  "Agra",
  "Aligarh",
  "Ambedkar Nagar",
  "Amethi",
  "Amroha",
  "Auraiya",
  "Ayodhya",
  "Azamgarh",
  "Baghpat",
  "Bahraich",
  "Ballia",
  "Balrampur",
  "Banda",
  "Barabanki",
  "Bareilly",
  "Basti",
  "Bhadohi",
  "Bijnor",
  "Budaun",
  "Bulandshahr",
  "Chandauli",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Etawah",
  "Farrukhabad",
  "Fatehpur",
  "Firozabad",
  "Gautam Buddha Nagar",
  "Ghaziabad",
  "Ghazipur",
  "Gonda",
  "Gorakhpur",
  "Hamirpur",
  "Hapur",
  "Hardoi",
  "Hathras",
  "Jalaun",
  "Jaunpur",
  "Jhansi",
  "Kannauj",
  "Kanpur Dehat",
  "Kanpur Nagar",
  "Kasganj",
  "Kaushambi",
  "Kushinagar",
  "Lakhimpur Kheri",
  "Lalitpur",
  "Lucknow",
  "Maharajganj",
  "Mahoba",
  "Mainpuri",
  "Mathura",
  "Mau",
  "Meerut",
  "Mirzapur",
  "Moradabad",
  "Muzaffarnagar",
  "Pilibhit",
  "Pratapgarh",
  "Prayagraj",
  "Raebareli",
  "Rampur",
  "Saharanpur",
  "Sambhal",
  "Sant Kabir Nagar",
  "Shahjahanpur",
  "Shamli",
  "Shravasti",
  "Siddharthnagar",
  "Sitapur",
  "Sonbhadra",
  "Sultanpur",
  "Unnao",
  "Varanasi",
];

const heavyVehicles = [
  "Truck","Bus","Trailer","Dump Truck",
  "Cement Mixer","Bulldozer","Crane","Excavator"
];

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function UserD() {
  const [district, setDistrict] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!district.trim() || !vehicle.trim()) {
        alert("Please select both district and vehicle.");
        return;
      }

      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/search`,
        {
          params: {
            district,
            vehicleName: vehicle,
          },
        }
      );

      const vehicles = response.data.data || [];

      if (vehicles.length === 0) {
        alert("No vehicles found.");
        return;
      }

      localStorage.setItem(
        "searchData",
        JSON.stringify(vehicles)
      );

      navigate("/searchdata", {
        state: vehicles,
      });
    } catch (error) {
      console.error("Search Error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
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
                <span className="No1">India's #1</span>
                <br />
                <span className="App">Heavy Vehicle App</span>
                <br />
                <span className="Booking">
                  Find Vehicles in Your District
                </span>
              </div>

              <div className="input">

                <select
                  className="select"
                  value={district}
                  onChange={(e) =>
                    setDistrict(e.target.value)
                  }
                >
                  <option value="">
                    -- Select District --
                  </option>
                  {districts.map((districtName) => (
                    <option
                      key={districtName}
                      value={districtName}
                    >
                      {districtName}
                    </option>
                  ))}
                </select>

                <select
                  className="select"
                  value={vehicle}
                  onChange={(e) =>
                    setVehicle(e.target.value)
                  }
                >
                  <option value="">
                    -- Select Vehicle --
                  </option>
                  {heavyVehicles.map((vehicleName) => (
                    <option
                      key={vehicleName}
                      value={vehicleName}
                    >
                      {vehicleName}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="subbmitDistrict"
                  disabled={loading}
                >
                  {loading
                    ? "Searching..."
                    : "Search Vehicle"}
                </button>

              </div>
            </div>
          </div>
        </div>

        <div className="rightContent">
          <div className="imageJCB">
            <img
              src={jcb}
              alt="Heavy construction vehicle"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="ServicesInUserD">
        <Services />
      </div>

      <div className="EarnInUser">
        <Earn />
      </div>

      <div className="testimoniall">
        <div className="headingS">
          <h1>Happy Customers</h1>
          <span className="borderLine"></span>
        </div>
        <Testimonial />
      </div>

      <div className="whyChooseUS">
        <div className="boxInChoose headingS">
          <h1>Why Choose Us</h1>
          <span className="borderLine"></span>
        </div>
        <AboutHighlights />
      </div>
    </>
  );
}

export default UserD;