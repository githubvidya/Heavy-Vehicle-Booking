require("dotenv").config();
const mongoose = require("mongoose");

const Vehicle = require("./models/Vehicle"); // adjust path if needed

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");

    await Vehicle.updateMany({}, [
      {
        $set: {
          photo: {
            $replaceAll: {
              input: "$photo",
              find: "uploads/",
              replacement: ""
            }
          }
        }
      }
    ]);

    console.log("✅ Photos cleaned");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });