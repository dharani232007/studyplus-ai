const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async (req,res)=>{
    const {name,email,password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();

        // Create an empty profile for the new user
        const newProfile = new Profile({userId: newUser._id, name: newUser.name,email: newUser.email});
        await newProfile.save();

        res.status(201).json({message:"User created successfully",
             userId:newUser._id
        });
       

    }catch (error){
        res.status(500).json({message: "Server error"});
    }
};



const loginUser = async (req,res)=>{

  const { email,password } = req.body;

  try{

    const user =
      await User.findOne({ email });

    if(!user){

      return res.status(400).json({
        message:"Invalid credentials"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if(!isMatch){

      return res.status(400).json({
        message:"Invalid credentials"
      });

    }

    const token =
      jwt.sign(
        {
          userId:user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn:"7d"
        }
      );

    res.status(200).json({

      token,

      userId:user._id,

      name:user.name,

      email:user.email

    });

  }catch(error){

    res.status(500).json({
      message:"Server Error"
    });

  }
};









module.exports = {signupUser,loginUser};
