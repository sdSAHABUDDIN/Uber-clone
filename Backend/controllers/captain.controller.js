import Captain from "../models/captain.model.js";

import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";


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