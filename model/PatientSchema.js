import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
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
    historyOfSurgery: {
      type: Number,
      default: ["No Surgery History"],
    },
    historyOfIllness: {
      type: String,
      default: ["No Illness History"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
