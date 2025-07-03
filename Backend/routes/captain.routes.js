import express from 'express';

import { rgisterCaptain } from '../controllers/captain.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/register",[
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
  body('fullname.lastname').isLength({ min: 2 }).withMessage('Last name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email address'),  
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('vehicle.color').isLength({ min: 3, max: 20 }).withMessage('Vehicle color must be between 3 and 20 characters long'),
  body('vehicle.plate').matches(/^[A-Z0-9]{1,13}$/).withMessage('Please enter a valid vehicle plate number'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
  body('vehicle.vehicleType').isIn(['car', 'bike', 'van']).withMessage('Vehicle type must be either car, bike, or van'),
  body('vehicle.model').isLength({ min: 3 }).withMessage('Vehicle model must be at least 3 characters long'),
  
], rgisterCaptain);
export default router;