import Captain from '../models/captain.model.js';
export const createCaptain = async ({ fullname, email, password, phone, vehicle }) => {
  if (!fullname || !email || !password || !phone || !vehicle) {
    throw new Error("All fields are required");
  }
  
  const captain = new Captain({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname
    },
    email,
    password,
    phone,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      type: vehicle.type,
      model: vehicle.model
    }
  });
  
  return captain;
}