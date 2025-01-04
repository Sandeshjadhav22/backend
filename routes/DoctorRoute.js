import express from "express";
import {
  signUpDoctor,
  signInDoctor,
  getDoctorInfo,
} from "../controller/DoctorController.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addPrescription,
  getDoctorConsultations,
} from "../controller/ConsultationController.js";

const router = express.Router();

//*auth
router.post(
  "/signup",
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  signUpDoctor
);
router.post("/signin", signInDoctor);
router.post("/getinfo", getDoctorInfo);

//*consultations
router.get("/consultations/:doctorId", getDoctorConsultations);
router.put("/prescription/:consultationId", addPrescription);

export default router;
