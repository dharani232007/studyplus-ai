

const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateRoadmap = async (chatData) => {

    try {

        const prompt = `
Generate a personalized learning roadmap.

Return ONLY valid JSON.

{
  "title":"",
  "currentLevel":"",
  "careerGoal":"",
  "dailyStudyHours":0,
  "durationWeeks":0,

  "weeks":[
    {
      "week":1,

      "topics":[
        {
          "title":"",
          "completed":false
        }
      ],

      "practiceProjects":[
        {
          "title":"",
          "completed":false
        }
      ],

      "studyStrategy":"",

      "weekProgress":0
    }
  ],

  "overallProgress":0,
  "completed":false
}

Learning Goal:
${chatData.learningGoal}

Current Level:
${chatData.currentLevel}

Daily Study Hours:
${chatData.dailyHours}

Career Goal:
${chatData.careerGoal}

Duration:
${chatData.duration}

Rules:
- Create realistic weekly roadmap
- Beginner friendly if user is beginner
- Include practical projects
- Include study strategy
- Progress starts at 0
- completed starts as false
- Return only JSON
`;

        const response = await groq.chat.completions.create({
    messages: [
        {
            role: "user",
            content: prompt
        }
    ],
    model: "llama-3.3-70b-versatile"
});

return response.choices[0].message.content;

    } catch (error) {

        console.log(error);

        throw error;;

    }

};

module.exports = generateRoadmap;

