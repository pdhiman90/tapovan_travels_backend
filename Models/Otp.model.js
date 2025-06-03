import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    Mobile:{
        required:true,
        type:String,
        unique:true
    },
    Otp:{
        required:true,
        type:String
    },
    expireAt:{
        required:true,
        type:Date,
        default:Date.now + 300000
    }
},{timestamps:true})

const Otp = mongoose.model("Otp",otpSchema);

export default Otp;
