require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const app = express();

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
// CLOUDINARY CONFIG (IMPORTANT ORDER FIX)
// ======================================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ======================================================
// MULTER + CLOUDINARY STORAGE
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

// ======================================================
// MODEL
// ======================================================
const VehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, default: "" },
    vehicleName: { type: String, required: true, trim: true },
    price: { type: String, default: "" },
    district: { type: String, default: "" },
    photo: { type: String, default: "" },
    mobilenumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid mobile number"],
    },
    bookings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

// ======================================================
// ROOT
// ======================================================
app.get("/", (req, res) => {
  res.send("🚀 API Running");
});

// ======================================================
// ADD VEHICLE
// ======================================================
app.post("/add", upload.single("photo"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const vehicle = new Vehicle({
      name: req.body.name,
      address: req.body.address || "",
      vehicleName: req.body.vehicleName,
      price: req.body.price || "",
      district: req.body.district || "",
      mobilenumber: req.body.mobilenumber,
      photo: req.file?.path || "",
    });

    await vehicle.save();

    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// OTHER ROUTES (UNCHANGED)
// ======================================================
app.get("/vehicles", async (req, res) => {
  const data = await Vehicle.find().sort({ createdAt: -1 });
  res.json(data);
});

app.get("/vehicles/:id", async (req, res) => {
  const data = await Vehicle.findById(req.params.id);
  res.json(data);
});

app.delete("/vehicles/:id", async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ======================================================
// SERVER START
// ======================================================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});