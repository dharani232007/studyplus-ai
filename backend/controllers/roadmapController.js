const RoadmapChat = require("../models/roadmapChat");

const roadmapQuestions = require("../data/questions");
const generateRoadmapAI = require("../services/aiService");
const Roadmap = require("../models/roadmap");


// START CHAT
const startRoadmapChat =
async (req,res)=>{

    try{

        const newChat =
        new RoadmapChat({

            userId:req.body.userId

        });

        await newChat.save();

        res.status(201).json({

            message:"Conversation started",

            nextQuestion:
            "What do you want to learn?",

            chatId:newChat._id

        });

    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }
};




// SAVE ANSWERS
const saveAnswer = async (req,res)=>{

    const {chatId,answer} = req.body;

    try{

        const chat =
        await RoadmapChat.findById(chatId);

        if(!chat){

            return res.status(404).json({
                message:"Chat not found"
            });

        }


        // CURRENT QUESTION
        const currentQuestion =
        roadmapQuestions[chat.currentStep - 1];


        // SAVE ANSWER DYNAMICALLY
        chat[currentQuestion.field] = answer;


        // MOVE TO NEXT STEP
        chat.currentStep += 1;

        await chat.save();


        // GET NEXT QUESTION
        const nextQuestion =
        roadmapQuestions[chat.currentStep - 1];


        // IF CONVERSATION COMPLETED
        if(!nextQuestion){

            return res.status(200).json({

                message:"Conversation completed",

                roadmapData:chat

            });

        }


        // SEND NEXT QUESTION
        res.status(200).json({

            nextQuestion:
            nextQuestion.question

        });

    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }
};

const generateRoadmap = async (req,res)=>{

    try{

        const {chatId} = req.body;

        const chatData =
        await RoadmapChat.findById(chatId);

        if(!chatData){

            return res.status(404).json({
                message:"Chat not found"
            });

        }

        // GENERATE AI RESPONSE
        const aiRoadmap =
        await generateRoadmapAI(chatData);

        console.log("AI RESPONSE:");
        console.log(aiRoadmap);


        // CONVERT JSON STRING TO OBJECT
        const cleanedResponse = aiRoadmap
           .replace(/```json/g, "")
           .replace(/```/g, "")
           .trim();

        const parsedRoadmap =
        JSON.parse(cleanedResponse);


        // SAVE ROADMAP
        const newRoadmap =
        new Roadmap({

            userId:chatData.userId,

            title:chatData.learningGoal,

            roadmapContent:
            parsedRoadmap.weeks

        });

        await newRoadmap.save();


        res.status(200).json({

            message:"Roadmap generated",

            roadmap:
            parsedRoadmap

        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }
};

const completeTopic =
async (req,res)=>{

    try{

        const {
            roadmapId,
            weekNumber,
            topicTitle
        } = req.body;


        const roadmap =
        await Roadmap.findById(
            roadmapId
        );

        if(!roadmap){

            return res.status(404).json({
                message:"Roadmap not found"
            });

        }


        // FIND WEEK
        const week =
        roadmap.roadmapContent.find(

            item =>
            item.week === weekNumber

        );

        if(!week){

            return res.status(404).json({
                message:"Week not found"
            });

        }


        // FIND TOPIC
        const topic =
        week.topics.find(

            item =>
            item.title === topicTitle

        );

        if(!topic){

            return res.status(404).json({
                message:"Topic not found"
            });

        }


        // MARK COMPLETE
        topic.completed = true;


        // CALCULATE PROGRESS
        let totalTopics = 0;
        let completedTopics = 0;


        roadmap.roadmapContent.forEach(

            week => {

                week.topics.forEach(

                    topic => {

                        totalTopics++;

                        if(topic.completed){

                            completedTopics++;

                        }

                    }

                );

            }

        );


        roadmap.progress =
        Math.floor(

            (completedTopics / totalTopics) * 100

        );


        // CHECK ROADMAP COMPLETED
        if(roadmap.progress === 100){

            roadmap.completed = true;

        }


        await roadmap.save();


        res.status(200).json({

            message:"Topic completed",

            progress:roadmap.progress,

            roadmap

        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }
};

const getRoadmaps = async (req, res) => {

    try {

        const roadmaps = await Roadmap.find({
            userId: req.params.userId
        });

        res.status(200).json({
            count: roadmaps.length,
            roadmaps
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};

const getDashboard = async(req,res)=>{

    try{

        const { userId } = req.params;

        const roadmaps =
        await Roadmap.find({ userId });

        const totalRoadmaps =
        roadmaps.length;

        const completedRoadmaps =
        roadmaps.filter(
            roadmap => roadmap.completed
        ).length;

        const overallProgress =
        roadmaps.length > 0
        ?
        Math.floor(

            roadmaps.reduce(

                (sum,item)=>
                sum + item.progress,

                0

            ) / roadmaps.length

        )
        :
        0;

        res.status(200).json({

            totalRoadmaps,
            completedRoadmaps,
            overallProgress

        });

    }catch(error){

        res.status(500).json({
            message:"Server Error"
        });

    }

};

const getRoadmapById = async(req,res)=>{

    try{

        const roadmap =
        await Roadmap.findById(
            req.params.id
        );

        if(!roadmap){

            return res.status(404).json({
                message:"Roadmap not found"
            });

        }

        res.status(200).json(
            roadmap
        );

    }catch(error){

        res.status(500).json({
            message:"Server Error"
        });

    }

};



module.exports = {

    startRoadmapChat,
    saveAnswer,
    generateRoadmap,
    completeTopic,
    getRoadmaps,
    getDashboard,
    getRoadmapById

};