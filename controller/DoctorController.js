import Doctor from "../model/DoctorSchema.js";
import { uploadOnCloudinary } from "../utils/helpers/cloudinary.js";
import genrateTokenAndSetCookie from "../utils/helpers/genrateTokenAndSetCookie.js";
import bcrypt from "bcryptjs";

const signUpDoctor = async (req, res) => {
  const { name, specialty, email, phoneNumber, yearsOfExperience, password } =
    req.body;

  try {
    const existingDoctor = await Doctor.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use." });
    }

    const profilePictureLocalPath = req.files?.profilePicture[0]?.path;
    if (!profilePictureLocalPath) {
      return res.status(400).json({ message: "Profile picture is required." });
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
    if (!profilePicture) {
      return res.status(500).json({
        message: "Something went wrong while uploading profile picture.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);


    const newDoctor = new Doctor({
      name,
      profilePicture: profilePicture?.url,
      specialty,
      email,
      phoneNumber,
      yearsOfExperience,
      password: hashedPassword,
    });

    await newDoctor.save();

    if (newDoctor) {
      const token = genrateTokenAndSetCookie(newDoctor._id, res);

      res.status(201).json({
        message: "Doctor registered successfully.",
        doctor: {
          id: newDoctor._id,
          name: newDoctor.name,
          email: newDoctor.email,
          profilePicture: newDoctor.profilePicture,
        },
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid Doctor Data" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const signInDoctor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Doctor does not exists, Please try to signUp" });
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }  

    const token = genrateTokenAndSetCookie(doctor._id, res);
    res.status(201).json({
      message: "Doctor SignIn successfully.",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const getDoctorInfo = async (req, res) => {
  const { doctorId } = req.body;
  try {
    const doctor = await Doctor.findById(doctorId).select(
      "profilePicture name email yearsOfExperience specialty"
    );
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(400).json({ message: "Doctor not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
}


const showAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select(
      "profilePicture name yearsOfExperience specialty"
    );
    if (doctors) {
      res.status(200).json(doctors);
    } else {
      res.status(400).json({ message: "No Doctors Found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};
export { signUpDoctor, signInDoctor, showAllDoctors, getDoctorInfo };
