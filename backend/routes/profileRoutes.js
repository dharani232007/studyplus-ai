const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    updateEducation,
    updatePreferences
} = require("../controllers/profileController");

const upload =
require("../middleware/upload");
const {
  uploadProfileImage
} = require("../controllers/uploadController");


// GET PROFILE
router.get("/:id",getProfile);



// UPDATE PROFILE
router.put("/:id",updateProfile);



// UPDATE EDUCATION
router.put("/education/:id",updateEducation);



// UPDATE PREFERENCES
router.put("/preferences/:id",updatePreferences);

router.put(
  "/image/:id",
  upload.single("image"),
  uploadProfileImage
);


module.exports = router;