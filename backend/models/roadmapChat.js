const mongoose = require("mongoose");

const roadmapChatSchema = new mongoose.Schema({

    userId:{
        type:String
    },

    learningGoal:{
        type:String,
        default:""
    },

    currentLevel:{
        type:String,
        default:""
    },

    dailyHours:{
        type:String,
        default:""
    },

    careerGoal:{
        type:String,
        default:""
    },

    duration:{
        type:String,
        default:""
    },

    currentStep:{
        type:Number,
        default:1
    }

},{
    timestamps:true
});

module.exports =
mongoose.model("RoadmapChat",roadmapChatSchema);