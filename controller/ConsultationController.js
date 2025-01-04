import Consultation from "../model/ConsultationSchema.js";

const createConsultation = async (req, res) => {
    try {
      const { 
        patientId, 
        doctorId, 
        currentIllnessHistory, 
        recentSurgery,
        familyHistory,
        transactionId,
        amount 
      } = req.body;
  
      const consultation = new Consultation({
        patient: patientId,
        doctor: doctorId,
        currentIllnessHistory,
        recentSurgery,
        familyHistory,
        payment: {
          transactionId,
          amount,
        }
      });
  
      await consultation.save();
      res.status(201).json(consultation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const addPrescription = async (req, res) => {
    try {
      const { consultationId } = req.params;
      const { careToBeTaken, medicines } = req.body;
  
      const consultation = await Consultation.findById(consultationId);
      if (!consultation) {
        return res.status(404).json({ message: "Consultation not found" });
      }
  
      consultation.prescription = {
        careToBeTaken,
        medicines,
        lastUpdated: new Date()
      };
  
      // Generate PDF and upload
    //   const pdfUrl = await generatePDF(consultation);
    //   consultation.prescription.pdfUrl = pdfUrl;
  
      await consultation.save();
      res.json(consultation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getDoctorConsultations = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const consultations = await Consultation.find({ doctor: doctorId })
        .populate('patient', 'name email')
        .sort('-createdAt');
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getPatientConsultations = async (req, res) => {
    try {
      const { patientId } = req.params;
      const consultations = await Consultation.find({ patient: patientId })
        .populate('doctor', 'name specialty')
        .sort('-createdAt');
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export { createConsultation,addPrescription ,getDoctorConsultations, getPatientConsultations };  