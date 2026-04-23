require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

const BASE_URL =
  process.env.BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? ""
    : `http://localhost:${PORT}`);

// _____________________________MIDDLEWARES____________________
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// _________________________________DATABASE_________________________

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// _____________________________________MULTER SETUP_________________________
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// _______________________________________SCHEMA________________________

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  vehicleName: String,
  price: String,
  district: String,
  photo: String,
  mobilenumber: {
    type: String,
    required: true,
    trim: true
  },
  bookings: { type: Number, default: 0 }
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

//___________________________________________ADD VEHICLE______________________________

app.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      address,
      vehicleName,
      price,
      district,
      mobilenumber
    } = req.body;

    // ________________________________________VALIDATION_________________________________

    if (!mobilenumber || mobilenumber.length !== 10) {
      return res.status(400).json({ message: "Valid mobile number required" });
    }

    const newVehicle = new Vehicle({
      name,
      address,
      vehicleName,
      price,
      district,
      mobilenumber,
      photo: req.file ? req.file.filename : null
    });

    await newVehicle.save();

    res.status(201).json({
      message: "Vehicle saved successfully",
      data: newVehicle
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// _______________________________________________GET ALL VEHICLES_______________________________
app.get("/vehicles", async (req, res) => {
  try {
    const data = await Vehicle.find();

    const updated = data.map(item => ({
      ...item._doc,
      mobilenumber: item.mobilenumber || null,
      photo: item.photo ? `${BASE_URL}/uploads/${item.photo}` : null
    }));

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: "Fetch error" });
  }
});

// ____________________________________________SEARCH____________________________

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

    const updated = data.map(item => ({
      ...item._doc,
      mobilenumber: item.mobilenumber || null,
      photo: item.photo ? `${BASE_URL}/uploads/${item.photo}` : null
    }));

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// ____________________________________________________GET SINGLE VEHICLE__________________________________

app.get("/vehicles/:id", async (req, res) => {
  try {
    const v = await Vehicle.findById(req.params.id);

    if (!v) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      ...v._doc,
      mobilenumber: v.mobilenumber || null,
      photo: v.photo ? `${BASE_URL}/uploads/${v.photo}` : null
    });

  } catch (err) {
    res.status(500).json({ error: "Error fetching vehicle" });
  }
});

//___________________________________________ DELETE VEHICLE_________________________________________

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

// ________________________________________________BOOK VEHICLE (WITH WHATSAPP NOTIFICATION)________________________________________

app.post("/book", async (req, res) => {
  try {
    const { vehicleId, userName, userMobile } = req.body;

    if (!userName || !userMobile) {
      return res.status(400).json({ message: "User details required" });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (!vehicle.mobilenumber) {
      return res.status(400).json({ message: "Owner mobile not available" });
    }

    // __________________________________________________________ WhatsApp Message____________________________________

    const message = `Hello, you have a new booking!\n\nCustomer: ${userName}\nMobile: ${userMobile}\nVehicle: ${vehicle.vehicleName}`;

    const whatsappURL = `https://wa.me/91${vehicle.mobilenumber}?text=${encodeURIComponent(message)}`;

    await Vehicle.findByIdAndUpdate(vehicleId, {
      $inc: { bookings: 1 }
    });

    res.json({
      message: "Booking successful",
      whatsappURL
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});