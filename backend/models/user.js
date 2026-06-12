const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        requires: true,
        unique: true
    },
    password: {
        type: String,
        requires: true,
    }
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);