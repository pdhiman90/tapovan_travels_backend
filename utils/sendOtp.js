import axios from 'axios';
import dotenv from 'dotenv';
import twilio from 'twilio';


dotenv.config();




const sendOTP = async (mobile, otp) => {
    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
  try {
    const message = await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${mobile}`  // Include country code
      });
      console.log(message);
  } catch (error) {
    console.error('Error sending SMS:', error.response?.data || error.message);
  }
};

// Example usage
export default sendOTP;
