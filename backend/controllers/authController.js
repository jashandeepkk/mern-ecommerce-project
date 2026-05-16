import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/*  REGISTER USER */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, storeName } = req.body;
   
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
    
   const allowedRoles = ["user", "vendor", "admin"];
const finalRole = allowedRoles.includes(req.body.role)
  ? req.body.role
  : "user";
   
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: finalRole,
      storeName,
    });
    
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeName: user.storeName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeName: user.storeName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};