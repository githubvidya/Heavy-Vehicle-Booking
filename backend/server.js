require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

// ======================================================
// MIDDLEWARE
// ======================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://heavy-vehicle.netlify.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ======================================================
// ROOT ROUTE
// ======================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Heavy Vehicle Booking API Running Successfully",
  });
});

// ======================================================
// API ROUTES
// ======================================================
app.use("/api", vehicleRoutes);

// ======================================================
// 404 HANDLER
// ======================================================
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ======================================================
// DATABASE CONNECTION + SERVER START
// ======================================================
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");

 app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

startServer();