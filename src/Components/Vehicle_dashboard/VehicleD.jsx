import React, { useState } from "react";
import axios from "axios";
import "./Vehicle.css";

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
  const heavyVehicles = ["Truck","Bus","Trailer","Crane","Excavator"];

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.vehicleName) {
      alert("Name and Vehicle Name are required");
      return;
    }

    if (!form.mobilenumber || form.mobilenumber.length !== 10) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      formData.append("photo", file);

    await axios.post(
  "https://heavy-vehicle-booking-production.up.railway.app/add",
  formData
);

      alert("✅ Vehicle Added Successfully");

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
      alert("❌ Error saving data");
    }
  };

  return (
    <div className="ownerContainer">

      {/* 🔥 WELCOME SECTION */}
      <div className="welcomeBox">
        <h1>Welcome Owner 🚚</h1>
        <p>
          List your vehicles and start receiving bookings instantly.
          Grow your business and connect with more customers easily.
        </p>
      </div>

      {/* 🔥 FORM CARD */}
      <form onSubmit={handleSubmit} className="formCard">

        <h2>Add Your Vehicle</h2>

        <input
          name="name"
          placeholder="Owner Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <select
          name="vehicleName"
          value={form.vehicleName}
          onChange={handleChange}
        >
          <option value="">Select Vehicle</option>
          {heavyVehicles.map((v, i) => (
            <option key={i} value={v}>{v}</option>
          ))}
        </select>

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="mobilenumber"
          placeholder="Mobile Number"
          value={form.mobilenumber}
          onChange={handleChange}
          maxLength={10}
        />

        <select
          name="district"
          value={form.district}
          onChange={handleChange}
        >
          <option value="">Select District</option>
          {districts.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        <input type="file" onChange={handleFileChange} />

        {preview && (
          <img src={preview} alt="preview" className="previewImg" />
        )}

        <button type="submit">Submit</button>

      </form>
    </div>
  );
};

export default VehicleD;