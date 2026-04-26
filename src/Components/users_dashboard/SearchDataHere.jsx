import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../users_dashboard/Search.css";
import PageLoader from "../users_dashboard/PageLoader";

const API_BASE_URL =
  "https://heavy-vehicle-booking-production.up.railway.app";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const getImageUrl = (photo) => {
    if (!photo) {
      return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600";
    }

    if (photo.startsWith("http")) {
      return photo;
    }

    return `https://${photo}`;
  };

  const openForm = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    setShowForm(true);
  };

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
      const res = await fetch(`${API_BASE_URL}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId: selectedVehicle,
          userName,
          userMobile,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      if (result.whatsappURL) {
        window.open(result.whatsappURL, "_blank");
      }

      alert(result.message);

      setShowForm(false);
      setUserName("");
      setUserMobile("");
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Booking failed");
    }
  };

  if (!Array.isArray(data) || data.length === 0) {
    return <h2 className="noResult">No results found</h2>;
  }

  return (
    <div className="searchContainer">
      <div className="headindS">
        <h1>Happy Customers</h1>
        <span className="borderLine"></span>
      </div>

      <div className="searchGrid">
        {data.map((item) => {
          const imageUrl = getImageUrl(item.photo);

          return (
            <div key={item._id} className="searchCard">
              <img
                src={imageUrl}
                alt={item.vehicleName || "Vehicle"}
                className="vehicleImg"
                onClick={() => setFullImage(imageUrl)}
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
                  <strong>Mobile:</strong> {item.mobilenumber}
                </p>

                <button onClick={() => openForm(item._id)}>
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {fullImage && (
        <div
          className="modalOverlay"
          onClick={() => setFullImage(null)}
        >
          <img
            src={fullImage}
            className="fullImageView"
            alt="Vehicle"
          />
        </div>
      )}

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
              maxLength="10"
              onChange={(e) =>
                setUserMobile(
                  e.target.value.replace(/\D/g, "")
                )
              }
            />

            <div className="modalButtons">
              <button onClick={handleBooking}>
                Confirm Booking
              </button>

              <button onClick={() => setShowForm(false)}>
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