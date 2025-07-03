import Captain from "../models/captain.model.js";

import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.model.js";

export const rgisterCaptain = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone, vehicle } = req.body;
  const isCaptainExists = await Captain.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ message: "Captain with this email already exists" });
  }
  // Check if vehicle plate already exists
  const isPlateExists = await Captain.findOne({ "vehicle.plate": vehicle.plate });
  if (isPlateExists) {    
    return res.status(400).json({ message: "Vehicle plate already exists" });
  }

  try {
    const captain = await createCaptain({ fullname, email, password, phone, vehicle });
    // Hash the password before saving
    captain.password = await Captain.hashPassword(password);
    // Generate authentication token
    const token = captain.generateAuthToken();
    
    await captain.save();
    
    res.status(201).json({
      message: "Captain registered successfully",
      token,
      captain: {
        id: captain._id,
        fullname: {
          firstname: captain.fullname.firstname,
          lastname: captain.fullname.lastname
        },
        email: captain.email,
        phone: captain.phone,
        vehicle: captain.vehicle
      }
    });
  } catch (error) {
    console.error("Error registering captain:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const loginCaptain = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict"
  });

  res.status(200).json({
    message: "Captain logged in successfully",
    token,
    captain: {
      id: captain._id,
      fullname: {
        firstname: captain.fullname.firstname,
        lastname: captain.fullname.lastname
      },
      email: captain.email,
      phone: captain.phone,
      vehicle: captain.vehicle
    }
  });
}

export const getCaptainProfile = async (req, res) => {
  try {
    const captain = req.captain;
    res.status(200).json({
      captain: {
        id: captain._id,
        fullname: {
          firstname: captain.fullname.firstname,
          lastname: captain.fullname.lastname
        },
        email: captain.email,
        phone: captain.phone,
        vehicle: captain.vehicle
      }
    });
  } catch (error) {
    console.error("Error fetching captain profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const logoutCaptain =async (req, res) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  await BlacklistToken.create({ token });

  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
}