import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname,email, password } = req.body;
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User with this email already exists" });
  }
  
  const hashedPassword = await User.hashPassword(password);
  const user = await createUser({ firstname:fullname.firstname, lastname:fullname.lastname, email, password: hashedPassword });
  const token = user.generateAuthToken();
  try {
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullname: {
          firstname: user.fullname.firstname,
          lastname: user.fullname.lastname
        },
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
}

export const loginUser=async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({email}).select("+password") ;
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
  });
  res.status(200).json({
    token, user});
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  await BlacklistToken.create({ token: req.cookies.token });
  res.status(200).json({ message: "Logged out successfully" });
}