import express from "express";
import {
  signInPatient,
  signUpPatient,
} from "../controller/PatientController.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createConsultation,
  getPatientConsultations,
} from "../controller/ConsultationController.js";
import { showAllDoctors } from "../controller/DoctorController.js";

const router = express.Router();

//*Auth
router.post(
  "/signup",
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  signUpPatient
);
router.post("/signin", signInPatient);

//*Doctors
router.get("/getAllDoctors", showAllDoctors);

//*Consultations
router.post("/create", createConsultation);
router.get("/consultations/:patientId", getPatientConsultations);

export default router;
