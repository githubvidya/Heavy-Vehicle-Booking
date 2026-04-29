import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../Vehicle_dashboard/LodingPage";
import "./Vehicle.css";

const API_BASE = import.meta.env.DEV
  ? "http://localhost:8080/api"
  : "https://heavy-vehicle-booking-production.up.railway.app/api";

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

  const initialForm = {
    name: "",
    address: "",
    vehicleName: "",
    price: "",
    district: "",
    mobilenumber: ""
  };

  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobilenumber") {
      setForm((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, "").slice(0, 10)
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("address", form.address);
      formData.append("vehicleName", form.vehicleName);
      formData.append("price", form.price);
      formData.append("district", form.district);
      formData.append("mobilenumber", form.mobilenumber);

      // Must match: upload.single("photo")
      formData.append("photo", file);

      const response = await axios.post(
        `${API_BASE}/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setSuccessMessage(response.data.message || "Vehicle uploaded successfully!");
      alert("Vehicle uploaded successfully!");

      setForm(initialForm);
      setFile(null);
      setPreview("");
    } catch (error) {
      console.error("Upload Error:", error);
      alert(
        error.response?.data?.message ||
        "Upload failed. Please try again."
      );
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
        <p>List your vehicle and start receiving bookings instantly.</p>
      </div>

      <form
        className="formCard"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
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
          required
        />

        <select
          name="vehicleName"
          value={form.vehicleName}
          onChange={handleChange}
          required
        >
          <option value="">Select Vehicle</option>
          {heavyVehicles.map((vehicle) => (
            <option key={vehicle} value={vehicle}>
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
          min="0"
          required
        />

        <input
          type="tel"
          name="mobilenumber"
          placeholder="Mobile Number"
          value={form.mobilenumber}
          onChange={handleChange}
          maxLength="10"
          required
        />

        <select
          name="district"
          value={form.district}
          onChange={handleChange}
          required
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="vehicleImg"
          />
        )}

        <button type="submit">
          Upload Vehicle
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