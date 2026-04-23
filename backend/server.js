require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// ===================== PORT =====================
const PORT = process.env.PORT || 8080;

// ===================== BASE URL =====================
const BASE_URL =
  process.env.BASE_URL || `http://localhost:${PORT}`;

// ===================== CREATE UPLOADS FOLDER =====================
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ===================== MIDDLEWARE =====================
app.use(cors({
  origin: "https://chimerical-stroopwafel-0df353.netlify.app/"
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===================== ROOT ROUTE =====================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ===================== SAFE MONGO CONNECTION =====================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables");
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ Mongo Error:", err));
}

// ===================== MULTER =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ===================== SCHEMA =====================
const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  vehicleName: String,
  price: String,
  district: String,
  photo: String,
  mobilenumber: { type: String, required: true, trim: true },
  bookings: { type: Number, default: 0 },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

// ===================== ADD VEHICLE =====================
app.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      address,
      vehicleName,
      price,
      district,
      mobilenumber,
    } = req.body;

    if (!mobilenumber || mobilenumber.length !== 10) {
      return res.status(400).json({
        message: "Valid 10-digit mobile number required",
      });
    }

    const newVehicle = new Vehicle({
      name,
      address,
      vehicleName,
      price,
      district,
      mobilenumber,
      photo: req.file ? req.file.filename : null,
    });

    await newVehicle.save();

    res.status(201).json({
      message: "Vehicle saved successfully",
      data: newVehicle,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===================== GET ALL =====================
app.get("/vehicles", async (req, res) => {
  try {
    const data = await Vehicle.find();

    const updated = data.map((item) => ({
      ...item._doc,
      photo: item.photo
        ? `${BASE_URL}/uploads/${item.photo}`
        : null,
    }));

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Fetch error" });
  }
});

// ===================== SEARCH =====================
app.get("/search", async (req, res) => {
  try {
    const { vehicleName, district } = req.query;
    const query = {};

    if (vehicleName) {
      query.vehicleName = { $regex: vehicleName, $options: "i" };
    }

    if (district) {
      query.district = { $regex: district, $options: "i" };
    }

    const data = await Vehicle.find(query);

    const updated = data.map((item) => ({
      ...item._doc,
      photo: item.photo
        ? `${BASE_URL}/uploads/${item.photo}`
        : null,
    }));

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// ===================== GET ONE =====================
app.get("/vehicles/:id", async (req, res) => {
  try {
    const v = await Vehicle.findById(req.params.id);

    if (!v) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      ...v._doc,
      photo: v.photo
        ? `${BASE_URL}/uploads/${v.photo}`
        : null,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching vehicle" });
  }
});

// ===================== DELETE =====================
app.delete("/vehicles/:id", async (req, res) => {
  try {
    const d = await Vehicle.findByIdAndDelete(req.params.id);

    if (!d) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete error" });
  }
});

// ===================== BOOK =====================
app.post("/book", async (req, res) => {
  try {
    const { vehicleId, userName, userMobile } = req.body;

    if (!userName || !userMobile) {
      return res.status(400).json({
        message: "User details required",
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    const message = `Hello, you have a new booking!\n\nCustomer: ${userName}\nMobile: ${userMobile}\nVehicle: ${vehicle.vehicleName}`;

    const whatsappURL = `https://wa.me/91${vehicle.mobilenumber}?text=${encodeURIComponent(
      message
    )}`;

    await Vehicle.findByIdAndUpdate(vehicleId, {
      $inc: { bookings: 1 },
    });

    res.json({
      message: "Booking successful",
      whatsappURL,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===================== START SERVER =====================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});