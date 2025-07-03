import express from "express";
import { body } from "express-validator";
import { registerUser,loginUser,getUserProfile, logoutUser } from "../controllers/user.controller.js";

import { authUser } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
  ],
  registerUser
);
router.post(
  "/login", 
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],loginUser
);

router.get('/profile',authUser,getUserProfile);
export default router;

router.get('/logout',logoutUser);