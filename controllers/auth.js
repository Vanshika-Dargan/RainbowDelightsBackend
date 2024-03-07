const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {promisify} = require("util");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Username is required"
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
      attributes: ['id', 'userName', 'password'],
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign({
        userId: user.id
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY_DAY
      });

      const options = {
        expires : new Date(Date.now()+process.env.JWT_COOKIE_EXPIRY_DAY * 24*60*60*1000),
        path: '/',
        secure:"true",
        sameSite: 'None',
        httpOnly:true
      }

      res.cookie("jwt",token,options)
      // console.log("ghjk",res)
      return res.status(200).json({
        message: "Login successful",
        data: {
          userId: user.id,
          userName: user.userName,
        }
      });
    }

    return res.status(400).json({
      message: "Password not matched"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const signup = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    if (!userName || !password || !email) {
      return res.status(400).json({
        message: "Username, password, and name are required"
      });
    }
    
    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      userName,
      password: hashPassword,
      email,
    });

    return res.status(200).json({
      message: "User added successfully",
      data: {
        userId: user.id,
        userName: user.userName,
        email: user.email,
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const logout = async(_,res) => {
  try{
    const options = {
        expires : new Date(
            Date.now()+process.env.JWT_COOKIE_EXPIRY_DAY * 24 *60*60*1000
        ),
        httpOnly:true
    }
    
    res.cookie("jwt","",options)  
    res.status(200).send("successfully loged out")
  }catch(error){
    return res.status(500).json({
      message: error.message
    });
  }
};

const protection = async(req, res,next) => {
  const token = (req.cookies.jwt);
  try{

    if (!token) {
      return res.status(400).json({
        message: "You have being logged out."
      });
    }

    const {userId} = await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)

    const user = await User.findOne({where:{id:userId}})
  
    if (!user) {
      return res.status(401).json({
        message: "The user doesn't not exists."
      });
    }
    req.userId = user.id;
    next()
  }catch(error){
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {login, signup, logout, protection}