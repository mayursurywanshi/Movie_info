const multer = require("multer");

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 },
  fileFilter(request, file, callback) {
    if (!allowedImageTypes.has(file.mimetype)) {
      const error = new Error("Only JPEG, PNG and WebP images are allowed");
      error.code = "INVALID_IMAGE_TYPE";
      return callback(error);
    }
    return callback(null, true);
  },
});

function uploadProfilePicture(request, response, next) {
  upload.single("profile_picture")(request, response, (error) => {
    if (!error) return next();

    const message =
      error.code === "LIMIT_FILE_SIZE"
        ? "Profile picture must be 1 MB or smaller"
        : error.message;

    return response.status(400).json({ status: "error", message });
  });
}

module.exports = uploadProfilePicture;
