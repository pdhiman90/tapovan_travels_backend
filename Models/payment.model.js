import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming your user model is named 'User'
    required: true,
  },
  amount: {
    type: Number,
    default: 1500
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  upiLink: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

 const Payment = mongoose.model("Payment", paymentSchema);
 export default Payment;
