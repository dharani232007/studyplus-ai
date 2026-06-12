const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    // PROFILE
    profileImage:{
        type:String,
        default:""
    },

    bio:{
        type:String,
        default:""
    },

    // EDUCATION & CAREER
    role:{
        type:String,
        default:""
    },

    collegeOrCompany:{
        type:String,
        default:""
    },

    department:{
        type:String,
        default:""
    },

    yearOfStudy:{
        type:String,
        default:""
    },

    domainInterest:{
        type:String,
        default:""
    },

    careerGoal:{
        type:String,
        default:""
    },

    skillLevel:{
        type:String,
        default:""
    },

    // LEARNING PREFERENCES
    dailyStudyGoal:{
        type:String,
        default:""
    },

    availableHours:{
        type:String,
        default:""
    },

    preferredLearningStyle:{
        type:String,
        default:""
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Profile",profileSchema);