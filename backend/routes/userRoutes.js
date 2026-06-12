const express = require("express");
const router = express.Router();


const {signupUser,loginUser} = require("../controllers/userController")

router.post("/signup",signupUser);
router.post("/login",loginUser);
// router.get("/profile/:id",getProfile)

module.exports = router;