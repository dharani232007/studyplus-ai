const express = require("express");

const router = express.Router();

const {

    startRoadmapChat,
    saveAnswer,
    generateRoadmap,
    completeTopic,
    getRoadmaps,
    getDashboard,
    getRoadmapById

} = require("../controllers/roadmapController");


// START CHAT
router.post("/start",startRoadmapChat);


// SAVE ANSWER
router.post("/answer",saveAnswer);

router.post("/generate",generateRoadmap);

router.put("/topic/complete",completeTopic);

router.get("/user/:userId",getRoadmaps);

router.get("/dashboard/:userId", getDashboard);

router.get("/:id", getRoadmapById);




module.exports = router;