const mongoose = require("mongoose");

const roadmapSchema =
new mongoose.Schema({

    userId:{
        type:String
    },

    title:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:""
    },

    roadmapContent: [
  {
    week: Number,

    topics: [
      {
        title: String,
        completed: Boolean
      }
    ],

    practiceProjects: [
      {
        title: String,
        completed: Boolean
      }
    ],

    studyStrategy: String
  }
],

    progress:{
        type:Number,
        default:0
    },

    completed:{
        type:Boolean,
        default:false
    },

    difficulty:{
        type:String,
        default:"Beginner"
    }

},{
    timestamps:true
});

module.exports =
mongoose.model("Roadmap",roadmapSchema);