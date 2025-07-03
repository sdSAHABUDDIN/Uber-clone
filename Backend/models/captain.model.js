import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        maxlength: [50, "First name must be at most 50 characters long"],
      },
      lastname: {
        type: String,
        required: true,
        minlength: [2, "Last name must be at least 3 characters long"],
        maxlength: [50, "Last name must be at most 50 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
    socketId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "busy"],
      default: "inactive",
    },

    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, "Vehicle color must be at least 3 characters long"],
        maxlength: [20, "Vehicle color must be at most 20 characters long"],
      },
      plate: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
          "Please enter a valid vehicle plate number",
        ],
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Vehicle capacity must be at least 1"],
        max: [7, "Vehicle capacity must be at most 7"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "bike", "van", "truck"],
        default: "car",
      },

      model: {
        type: String,
        required: true,
        minlength: [3, "Vehicle model must be at least 3 characters long"],
        maxlength: [50, "Vehicle model must be at most 50 characters long"],
      },
    },
    location: {
      let: {
        type: Number,
        // required: true,
      },
      lng: {
        type: Number,
        // required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
captainSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const Captain = mongoose.model("Captain", captainSchema);
export default Captain;
