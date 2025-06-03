import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Middlewares/dbconnection.js";
import authRoute from "./routes/auth.route.js";



const app = express();
app.use(cors(
  {
   origin: 'https://tapovan-travel-front.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}
));
dotenv.config();
connectDB();



app.use('/api/auth',authRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

