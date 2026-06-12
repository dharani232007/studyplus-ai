require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes")
const roadmapRoutes = require("./routes/roadmapRoutes");
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json())

connectDB();

app.use("/api/users",userRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/roadmap",roadmapRoutes);

app.get("/",(req,res)=>{
    res.send("Server is running")
});

app.listen(5000,()=>{
    console.log("server is running on port 5000")
});