const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {promisify} = require("util");


const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName) {
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
        userName,
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
        httpOnly:true
      }

      res.cookie("jwt",token,options)
      return res.status(200).json({
        message: "Login successful",
        data: {
          userId: user.id,
          username: user.username,
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
    const { userName, password, name } = req.body;
    if (!userName || !password || !name) {
      return res.status(400).json({
        message: "Username, password, and name are required"
      });
    }
    
    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      userName,
      password: hashPassword,
      name,
    });

    return res.status(200).json({
      message: "User added successfully",
      data: {
        userId: user.id,
        userName: user.userName,
        name: user.name,
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
  try{
    const token = (req.headers.cookie).split('=')[1];

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