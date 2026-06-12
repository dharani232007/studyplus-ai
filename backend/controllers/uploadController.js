const cloudinary = require("../config/cloudinary");
const Profile = require("../models/profile");
const fs = require("fs");

const uploadProfileImage =
async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const result =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "profiles"
        }
      );
      fs.unlinkSync(req.file.path);


    const profile =
      await Profile.findOneAndUpdate(
        { userId: req.params.id },
        {
          profileImage: result.secure_url
        },
       { returnDocument: "after" }
      );

    res.status(200).json(profile);

  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message
  });
}

};

module.exports = {
  uploadProfileImage
};