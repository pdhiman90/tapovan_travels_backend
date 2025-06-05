import authservice from "../Services/authService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendOTP from "../utils/sendOtp.js";

dotenv.config();
const signup = async (req, res) => {
    try {   
        const { FirstName,LastName,Mobile,Password,confirmPassword,Age,Gender } = req.body;
        if(!FirstName || !LastName || !Mobile || !Password || !confirmPassword || !Age || !Gender){
            return res.status(400).json({ error: "All fields are required" });
        }
        if(Password !== confirmPassword){
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const checkExist = await authservice.checkUser(Mobile);
        if(checkExist){
            return res.status(400).json({ error: "User already exists" });
        }
       const hashedPassword = await bcrypt.hash(Password, 10);
        const payload = {
            FirstName:FirstName,
            LastName:LastName,
            Mobile:Mobile,
            Password:hashedPassword,
            Age:Age,
            Gender:Gender
        }
        const user = await authservice.register(payload);
        const token = jwt.sign({
            user_id:user._id,
            Mobile:user.Mobile,
            FirstName:user.FirstName,
            LastName:user.LastName,
            Age:user.Age,
            Gender:user.Gender
        },process.env.JWT_SECRET||'jwt_secret',{
            expiresIn:"1d"
        })
        res.status(201).json({
            status:true,
            message:"User registered successfully",user_id:user._id,token:token});
    } catch (error) {
        res.status(500).json({ status:false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { Mobile, Password } = req.body;
        if(!Mobile || !Password){
            return res.status(400).json({ error: "All fields are required" });
        }
        console.log(Mobile,Password);
        const user = await authservice.checkUser(Mobile);
        if(!user){
            return res.status(400).json({ error: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if(!isMatch){
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({
            user_id:user._id,
            Mobile:user.Mobile,
            FirstName:user.FirstName,
            LastName:user.LastName,
            Age:user.Age,
            Gender:user.Gender
        },process.env.JWT_SECRET||'jwt_secret',{
            expiresIn:"1d"
        })
        res.status(200).json({
            status:true,
            message:"User logged in successfully",user_id:user._id,token:token});
    } catch (error) {
        res.status(500).json({ status:false, message: error.message });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { Mobile } = req.body;
        console.log(Mobile);
        if(!Mobile){
            return res.status(400).json({ error: "Mobile number is required" });
        }
        const user = await authservice.checkUser(Mobile);
        if(user){
            return res.status(400).json({ error: "User already exist" });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const payload = {
            Mobile:Mobile,
            Otp:otp
        }

        const otpUser = await authservice.registerOtp(payload);
        const sendOtpResponce = await sendOTP(payload.Mobile,payload.Otp);
        console.log(sendOtpResponce,"send otp to mobile response")
        res.status(200).json({
            status:true,
            message:"Otp sent successfully",otpUser_id:otpUser._id});
    } catch (error) {
        res.status(500).json({ status:false, message: error.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { Mobile, Otp } = req.body;
        if(!Mobile || !Otp){
            return res.status(400).json({ error: "All fields are required" });
        }
        const OtpUser = await authservice.findOtp(Mobile);
        if(!OtpUser){
            return res.status(400).json({ error: "Otp does not exist" });
        }
        console.log(OtpUser);
        console.log(Otp);
        if(OtpUser.Otp !== Otp){
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.status(200).json({
            status:true,
            message:"Otp verified successfully",user_id:OtpUser._id});
    } catch (error) {
        res.status(500).json({ status:false, message: error.message });
    }
};
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
//     key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET',
//   });
// const createOrder = async(req,res)=>{
//     const { amount, currency = 'INR', receipt = 'receipt#1' } = req.body;
//     try {
//         const options = {
//             amount: amount * 100, // amount in paisa
//             currency,
//             receipt,
//           };

//           const order = await razorpayInstance.orders.create(options);
//     res.json({ success: true, order });
        
//     } catch (error) {
//         res.status(500).json({ status:false, message: error.message });
//     }
// }
//  const verifyPayment = (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
//     const generatedSignature = crypto
//       .createHmac('sha256', razorpayInstance.key_secret)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');
  
//     if (generatedSignature === razorpay_signature) {
//       res.json({ success: true, message: 'Payment verified' });
//     } else {
//       res.status(400).json({ success: false, message: 'Invalid signature' });
//     }
//   };

export default {signup,login,sendOtp,verifyOtp}
