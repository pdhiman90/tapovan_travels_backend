import User from "../Models/Auth.model.js";
import Otp from "../Models/Otp.model.js";

const register = async(payload)=>{
    try {
        const newUser = new User({
            FirstName:payload.FirstName,
            LastName:payload.LastName,
            Mobile:payload.Mobile,
            Password:payload.Password,
            Age:payload.Age,
            Gender:payload.Gender
        })
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}

const checkUser = async(Mobile)=>{
    try {
        const user = await User.findOne({Mobile:Mobile});
        return user;
    } catch (error) {
        throw error;
    }
}

const registerOtp = async(payload)=>{
    try {
        const newOtp = new Otp({
            Mobile:payload.Mobile,
            Otp:payload.Otp,
            expireAt:new Date(Date.now() + 300000).toLocaleString()
        })
        await Otp.deleteMany({Mobile:payload.Mobile});
        const savedOtp = await newOtp.save();
        return savedOtp;
    } catch (error) {
        throw error;
    }
}

const findOtp = async(Mobile)=>{
    try {
        const otp = await Otp.findOne({Mobile:Mobile});
        return otp;
    } catch (error) {
        throw error;
    }
}

export default {register,checkUser,registerOtp,findOtp}