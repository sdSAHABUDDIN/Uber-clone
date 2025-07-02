import User from "../models/user.model.js";

export const createUser = async ({firstname,lastname,email,password}) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user= new User({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  });
  return  user;
}