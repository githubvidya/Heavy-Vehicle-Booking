import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../users_dashboard/Search.css";

function SearchDataHere() {
  const location = useLocation();

  const data =
    location.state ||
    JSON.parse(localStorage.getItem("searchData")) ||
    [];

  // ✅ Form state
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");

  // ✅ Full Image Popup state
  const [fullImage, setFullImage] = useState(null);

  if (!Array.isArray(data) || data.length === 0) {
    return <h2 className="noResult">No results found</h2>;
  }

  // ✅ Open booking form
  const openForm = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    setShowForm(true);
  };

  // ✅ Booking function
  const handleBooking = async () => {
    if (!userName || !userMobile) {
      alert("Please enter name and mobile number");
      return;
    }

    if (userMobile.length !== 10) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
    const res = await fetch(
  "https://heavy-vehicle-booking-production.up.railway.app/book",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify({
          vehicleId: selectedVehicle,
          userName,
          userMobile
        }),
      });

      const data = await res.json();

      if (data.whatsappURL) {
        window.open(data.whatsappURL, "_blank");
      }

      alert(data.message);

      setShowForm(false);
      setUserName("");
      setUserMobile("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="searchContainer">
      <div className="headindS">
        <h1>Happy Customers</h1>
        <span className="borderLine"></span>
      </div>

      <div className="searchGrid">
        {data.map((item) => (
          <div key={item._id || item.name} className="searchCard">

            {item.photo && (
              <img
                src={item.photo}
                alt="vehicle"
                className="vehicleImg"
                onClick={() => setFullImage(item.photo)} // ✅ click to view full
              />
            )}

            <div className="cardContent">
              <h3>{item.name}</h3>
              <p><strong>Vehicle:</strong> {item.vehicleName}</p>
              <p><strong>District:</strong> {item.district}</p>
              <p><strong>Address:</strong> {item.address}</p>
              <p><strong>Price:</strong> {item.price}</p>
              <p><strong>MobileNumber:</strong> {item.mobilenumber}</p>

              <button onClick={() => openForm(item._id)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ FULL IMAGE POPUP */}
      {fullImage && (
        <div
          className="modalOverlay"
          onClick={() => setFullImage(null)}
        >
          <img src={fullImage} className="fullImageView" alt="full" />
        </div>
      )}

      {/* ✅ BOOKING FORM */}
      {showForm && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h2>Book Vehicle</h2>

            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Enter mobile number"
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
            />

            <div className="modalButtons">
              <button onClick={handleBooking}>Confirm Booking</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchDataHere;