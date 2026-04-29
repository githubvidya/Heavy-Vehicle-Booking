import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../users_dashboard/Search.css";
import PageLoader from "../users_dashboard/PageLoader";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function SearchDataHere() {
  const location = useLocation();

  const data =
    location.state ||
    JSON.parse(localStorage.getItem("searchData")) ||
    [];

  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [fullImage, setFullImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

const getImageUrl = (photo) => {
  if (!photo || typeof photo !== "string") {
    return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600";
  }

  return photo.startsWith("http")
    ? photo
    : `https://${photo}`;
};

const openForm = (vehicle) => {
  setSelectedVehicle(vehicle);
  setShowForm(true);
};

const closeForm = () => {
  setShowForm(false);
  setSelectedVehicle(null);
  setUserName("");
  setUserMobile("");
};

const handleBooking = async () => {
  if (!userName.trim() || !userMobile.trim()) {
    alert("Please enter your name and mobile number");
    return;
  }

  if (!/^\d{10}$/.test(userMobile)) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  try {
    setBookingLoading(true);

    const response = await fetch(`${API_BASE_URL}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicleId: selectedVehicle?._id,
        userName: userName.trim(),
        userMobile: userMobile.trim(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Booking failed");
    }

    alert(result.message);

    if (result.whatsappURL) {
      window.open(result.whatsappURL, "_blank");
    }

    closeForm();
  } catch (error) {
    console.error("Booking Error:", error);
    alert(error.message || "Booking failed");
  } finally {
    setBookingLoading(false);
  }
};

if (loading) {
  return <PageLoader />;
}

if (!Array.isArray(data) || data.length === 0) {
  return (
    <div className="noResult">
      <h2>No vehicles found</h2>
    </div>
  );
}

return (
  <div className="searchContainer">
    <div className="headingS">
      <h1>Available Vehicles</h1>
      <span className="borderLine"></span>
    </div>

    <div className="searchGrid">
      {data.map((item) => (
        <div key={item._id} className="searchCard">
          <img
            src={getImageUrl(item.photo)}
            alt={item.vehicleName || "Vehicle"}
            className="vehicleImg"
            loading="lazy"
            onClick={() => {
              setFullImage(getImageUrl(item.photo));
              setSelectedVehicle(item);
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600";
            }}
          />

          <div className="cardContent">
            <h3>{item.name}</h3>

            <p>
              <strong>Vehicle:</strong> {item.vehicleName}
            </p>

            <p>
              <strong>District:</strong> {item.district}
            </p>

            <p>
              <strong>Address:</strong> {item.address}
            </p>

            <p>
              <strong>Price:</strong> ₹{item.price}
            </p>

            <p>
              <strong>Owner Mobile:</strong> {item.mobilenumber}
            </p>

            <button onClick={() => openForm(item)}>
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>

    {fullImage && (
      <div
        className="modalOverlay"
        onClick={() => setFullImage(null)}
      >
        <img
          src={fullImage}
          alt={selectedVehicle?.vehicleName || "Vehicle Image"}
          className="fullImageView"
          onClick={(e) => e.stopPropagation()}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600";
          }}
        />
      </div>
    )}

    {showForm && selectedVehicle && (
      <div className="modalOverlay">
        <div className="modalBox">
          <h2>Book Vehicle</h2>

          <p className="selectedVehicleName">
            {selectedVehicle.vehicleName}
          </p>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={userMobile}
            maxLength={10}
            onChange={(e) =>
              setUserMobile(
                e.target.value.replace(/\D/g, "")
              )
            }
          />

          <div className="modalButtons">
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
            >
              {bookingLoading
                ? "Booking..."
                : "Confirm Booking"}
            </button>

            <button
              onClick={closeForm}
              disabled={bookingLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default SearchDataHere;