import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname,email, password } = req.body;
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
  res.status(200).json({
    token, user});
}