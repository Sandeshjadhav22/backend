import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import doctorRoutes from "./routes/DoctorRoute.js";
import patientRoutes from "./routes/PatientRoute.js";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";

dotenv.config();
const PORT = process.env.PORT || 3000;


const app = express();
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.get("/", (req, res) => {
  res.send("Hello World hiiiii");
});

//*Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//*Routes
app.use(cors(corsOptions));
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);

connectDB(process.env.MONGODB_URL);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
