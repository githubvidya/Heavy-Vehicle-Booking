require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const app = express();
const BASE_URL =
  process.env.BASE_URL ||
  "https://heavy-vehicle-booking-production.up.railway.app";
// ======================================================
// PORT
// ======================================================
const PORT = process.env.PORT || 8080;

// ======================================================
// MIDDLEWARE
// ======================================================
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://heavy-vehicle.netlify.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ======================================================
// MONGODB
// ======================================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ======================================================
// CLOUDINARY + MULTER
// ======================================================
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "heavy-vehicles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`,
  },
});

const upload = multer({ storage });




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
// ======================================================
// MODEL
// ======================================================
const VehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // Cloudinary URL
      required: true,
    },
    mobilenumber: {
      type: String,
      required: true,
    },
    bookings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

// ======================================================
// ROOT
// ======================================================
app.get("/", (req, res) => {
  res.send("🚀 Heavy Vehicle Booking API Running with Cloudinary");
});

// ======================================================
// ADD VEHICLE
// ======================================================
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

    const vehicle = new Vehicle({
      name,
      address,
      vehicleName,
      price,
      district,
      mobilenumber,
      photo: req.file ? req.file.path : null,
    });

    await vehicle.save();

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("Add Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// GET ALL VEHICLES
// ======================================================
app.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// SEARCH VEHICLES
// ======================================================
app.get("/search", async (req, res) => {
  try {
    const { vehicleName, district } = req.query;

    const query = {};

    if (vehicleName) {
      query.vehicleName = {
        $regex: vehicleName,
        $options: "i",
      };
    }

    if (district) {
      query.district = {
        $regex: district,
        $options: "i",
      };
    }

    const vehicles = await Vehicle.find(query).sort({
      createdAt: -1,
    });

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE VEHICLE
// ======================================================
app.get("/vehicles/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// DELETE VEHICLE
// ======================================================
app.delete("/vehicles/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// BOOK VEHICLE
// ======================================================
app.post("/book", async (req, res) => {
  try {
    const { vehicleId, userName, userMobile } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const message = `Hello, booking request:

Customer Name: ${userName}
Mobile: ${userMobile}
Vehicle: ${vehicle.vehicleName}
Location: ${vehicle.district}`;

    const whatsappURL = `https://wa.me/91${vehicle.mobilenumber}?text=${encodeURIComponent(
      message
    )}`;

    await Vehicle.findByIdAndUpdate(vehicleId, {
      $inc: { bookings: 1 },
    });

    res.json({
      success: true,
      message: "Booking successful",
      whatsappURL,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// START SERVER
// ======================================================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});