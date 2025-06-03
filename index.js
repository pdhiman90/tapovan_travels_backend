import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Middlewares/dbconnection.js";
import authRoute from "./routes/auth.route.js";


const allowedOrigins = [
  'http://localhost:5173',
  'https://tapovan-travel-front.vercel.app',
];
const app = express();
app.use(cors(
  {
  origin: allowedOrigins,
  credentials: true,
}
));
dotenv.config();
connectDB();



app.use('/api/auth',authRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

