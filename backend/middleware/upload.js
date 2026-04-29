const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "heavy-vehicles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => {
      const name = file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-");

      return `${Date.now()}-${name}`;
    },
  },
});

module.exports = multer({ storage });