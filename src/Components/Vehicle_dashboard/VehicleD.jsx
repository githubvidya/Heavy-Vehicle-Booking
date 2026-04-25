import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../Vehicle_dashboard/LodingPage";
import "./Vehicle.css";

const API_BASE =
  "https://heavy-vehicle-booking-production.up.railway.app";

const VehicleD = () => {
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
    "Crane",
    "Excavator"
  ];

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    vehicleName: "",
    price: "",
    district: "",
    mobilenumber: ""
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");

    if (!form.name || !form.vehicleName) {
      alert("Name and Vehicle Name are required");
      return;
    }

    if (!form.mobilenumber || form.mobilenumber.length !== 10) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file) {
        formData.append("photo", file);
      }

      const res = await axios.post(
        `${API_BASE}/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      setSuccessMessage("✅ Vehicle Added Successfully!");

      setForm({
        name: "",
        address: "",
        vehicleName: "",
        price: "",
        district: "",
        mobilenumber: ""
      });

      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Error saving data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="ownerContainer">
      <div className="welcomeBox">
        <h1>Welcome Owner 🚚</h1>
        <p>
          List your vehicles and start receiving bookings instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="formCard">
        <h2>Add Your Vehicle</h2>

        <input
          type="text"
          name="name"
          placeholder="Owner Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <select
          name="vehicleName"
          value={form.vehicleName}
          onChange={handleChange}
          required
        >
          <option value="">Select Vehicle</option>
          {heavyVehicles.map((vehicle, index) => (
            <option key={index} value={vehicle}>
              {vehicle}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="mobilenumber"
          placeholder="Mobile Number"
          value={form.mobilenumber}
          onChange={handleChange}
          maxLength={10}
          required
        />

        <select
          name="district"
          value={form.district}
          onChange={handleChange}
        >
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>

       <input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
/>

{preview && (
  <img
    src={preview}
    alt="Vehicle Preview"
    className="vehicleImg"
  />
)}

        <button type="submit">
          Submit
        </button>
      </form>
          {successMessage && (
          <p className="successMessage">
            {successMessage}
          </p>
        )}
    </div>
    
  );
};

export default VehicleD;