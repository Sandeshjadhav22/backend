import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  // Step 1
  currentIllnessHistory: {
    type: String,
    required: true
  },
  recentSurgery: {
    procedure: String,
    timeSpan: String
  },
  // Step 2
  familyHistory: {
    isDiabetic: {
      type: Boolean,
      required: true
    },
    allergies: String,
    others: String
  },
  // Step 3
  payment: {
    transactionId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },    
  prescription: {
    careToBeTaken: String,
    medicines: [{
      name: String,
      dosage: String,
      duration: String,
      timing: String
    }],
    pdfUrl: String,
    lastUpdated: Date
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

const Consultation = mongoose.model("Consultation", consultationSchema);

export default Consultation;