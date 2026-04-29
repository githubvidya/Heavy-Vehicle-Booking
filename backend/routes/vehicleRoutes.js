const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const upload = require("../middleware/upload");

// ==========================
// SEARCH VEHICLES (FIXED)
// ==========================
router.get("/search",async (req, res) => {
  try {
    const { district, vehicleName } = req.query;

    // ❗ safety check (VERY IMPORTANT)
    if (!district || !vehicleName) {
      return res.status(400).json({
        success: false,
        message: "district and vehicleName are required",
      });
    }

    const vehicles = await Vehicle.find({
      district: { $regex: new RegExp(`^${district.trim()}$`, "i") },
      vehicleName: { $regex: new RegExp(`^${vehicleName.trim()}$`, "i") },
    });

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
      message:
        vehicles.length > 0
          ? "Vehicles found successfully"
          : "No vehicles found",
    });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// ==========================
// ADD VEHICLE
// ==========================
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, address, vehicleName, price, district, mobilenumber } = req.body;
    const photo = req.file ? req.file.path : "";

    if (!name || !address || !vehicleName || !price || !district || !mobilenumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newVehicle = new Vehicle({
      name,
      address,
      vehicleName,
      price,
      district,
      mobilenumber,
      photo,
    });

    await newVehicle.save();

    return res.status(201).json({
      success: true,
      message: "Vehicle uploaded successfully!",
      data: newVehicle,
    });
  } catch (error) {
    console.error("Add Vehicle Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================
// BOOK VEHICLE
// ==========================
router.post("/book", async (req, res) => {
  try {
    const { vehicleId, userName, userMobile } = req.body;

    if (!vehicleId || !userName || !userMobile) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    vehicle.bookings = (vehicle.bookings || 0) + 1;
    await vehicle.save();

    const message = `Hello ${vehicle.name},\nI am ${userName}. I would like to book your ${vehicle.vehicleName}.\nMy mobile: ${userMobile}.`;
    const whatsappURL = `https://wa.me/91${vehicle.mobilenumber}?text=${encodeURIComponent(message)}`;

    return res.status(200).json({
      success: true,
      message: "Booking initiated successfully!",
      whatsappURL,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;