const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    vehicleName: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    photo: { type: String, default: "" },
    mobilenumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Enter valid 10-digit number"],
    },
    bookings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);