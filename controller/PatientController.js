import Patient from "../model/PatientSchema.js";
import genrateTokenAndSetCookie from "../utils/helpers/genrateTokenAndSetCookie.js";
import {uploadOnCloudinary} from "../utils/helpers/cloudinary.js";

const signUpPatient = async (req, res) => {
  const {
    name,
    age,
    email,
    password,
    phoneNumber,
    address,
    historyOfSurgery,
    historyOfIllness,
  } = req.body;

  try {
    const existingPatient = await Patient.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingPatient) {
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

    const newPatient = new Patient({
      profilePicture: profilePicture?.url,
      name,
      age,
      email,
      password,
      phoneNumber,
      address,
      historyOfSurgery,
      historyOfIllness,
    });

    await newPatient.save();

    if (newPatient) {
      const token = genrateTokenAndSetCookie(newPatient._id, res);

      res.status(201).json({
        message: "Patient registered successfully.",
        doctor: {
          id: newPatient._id,
          name: newPatient.name,
          email: newPatient.email,
        },
        token,
      });
    } else {
      res.status(400).json({ message: "Patient registration failed." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const signInPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res
        .status(400)
        .json({ message: "Patient does not exists, Please try to signUp" });
    }

    if (password != patient.password) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = genrateTokenAndSetCookie(patient._id, res);
    res.status(201).json({
      message: "patient SignIn successfully.",
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong in signInPatient. Please try again.",
    });
  }
};
export { signUpPatient, signInPatient };
