import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/customer.js'
import Products from '../models/products.js'


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
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
        username,
      },
      attributes: ['id', 'username', 'password'],
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

      return res.status(200).json({
        message: "Login successful",
        data: {
          userId: user.id,
          username: user.username,
          token
        }
      });
    }

    return res.status(400).json({
      message: "Password not matched"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({
        message: "Username, password, and name are required"
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      username,
      password: hashPassword,
      name,
    });

    return res.status(200).json({
      message: "User added successfully",
      data: {
        userId: user.id,
        username: user.username,
        name: user.name,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message
    });
  }
};
