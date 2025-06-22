import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Middlewares/dbconnection.js";
import authRoute from "./Routes/auth.route.js";
import paymentRoute from "./Routes/paymentRoute.js"

const app = express();
app.use(cors());
dotenv.config();
connectDB();



app.use('/api/auth',authRoute);
app.use('/api/payment',paymentRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

