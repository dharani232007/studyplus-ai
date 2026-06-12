const Profile = require("../models/profile");
const User = require("../models/user");


// GET PROFILE
const getProfile = async (req,res)=>{

    try{

        const profile = await Profile.findOne({
            userId:req.params.id
        });

        const user = await User.findById(req.params.id);

        if(!profile || !user){
            return res.status(404).json({
                message:"Profile not found"
            });
        }

        res.status(200).json({

            // USER DATA
            name:user.name,
            email:user.email,

            // PROFILE DATA
            profileImage:profile.profileImage,
            bio:profile.bio,
            joinedDate:user.createdAt,

            // EDUCATION & CAREER
            role:profile.role,
            collegeOrCompany:profile.collegeOrCompany,
            department:profile.department,
            yearOfStudy:profile.yearOfStudy,
            domainInterest:profile.domainInterest,
            careerGoal:profile.careerGoal,
            skillLevel:profile.skillLevel,

            // LEARNING PREFERENCES
            dailyStudyGoal:profile.dailyStudyGoal,
            availableHours:profile.availableHours,
            preferredLearningStyle:
            profile.preferredLearningStyle

        });

    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }
};



// UPDATE PROFILE
const updateProfile = async (req,res)=>{

    const {bio} = req.body;

    try{

        const updatedProfile =
        await Profile.findOneAndUpdate(

            {userId:req.params.id},

            {
                bio
            },

            {new:true}

        );

        res.status(200).json(updatedProfile);

    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }
};




// UPDATE EDUCATION DETAILS
const updateEducation = async (req,res)=>{

    const {
        role,
        collegeOrCompany,
        department,
        yearOfStudy,
        domainInterest,
        careerGoal,
        skillLevel
    } = req.body;

    try{

        const updatedProfile =
        await Profile.findOneAndUpdate(

            {userId:req.params.id},

            {
                role,
                collegeOrCompany,
                department,
                yearOfStudy,
                domainInterest,
                careerGoal,
                skillLevel
            },

            {new:true}

        );

        res.status(200).json(updatedProfile);

    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }
};




// UPDATE LEARNING PREFERENCES
const updatePreferences = async (req,res)=>{

    const {
        dailyStudyGoal,
        availableHours,
        preferredLearningStyle
    } = req.body;

    try{

        const updatedProfile =
        await Profile.findOneAndUpdate(

            {userId:req.params.id},

            {
                dailyStudyGoal,
                availableHours,
                preferredLearningStyle
            },

            {new:true}

        );

        res.status(200).json(updatedProfile);

    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }
};


module.exports = {
    getProfile,
    updateProfile,
    updateEducation,
    updatePreferences
};