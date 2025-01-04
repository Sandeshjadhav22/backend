import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps: true});


const Doctor = mongoose.model("Doctor", doctorSchema);


export default Doctor;