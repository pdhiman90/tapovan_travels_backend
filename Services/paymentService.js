import QRCode from "qrcode";
import Payment from "../Models/payment.model.js";
// import qrcode from  'qrcode-terminal';

const { UPI_ID, RECEIVER_NAME } = process.env;

const createPayment = async ({ name, mobile,userId }) => {
  const amount = 1500;
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(RECEIVER_NAME)}&am=${amount}&cu=INR`;

  // Generate QR Code (Data URL)
  const qrCodeDataURL = await QRCode.toDataURL(upiLink);
  console.log(upiLink)


  const payment = new Payment({
    name,
    mobile,
    amount,
    user:userId,
    upiLink
  });

  await payment.save();

  return {
    ...payment.toObject(),
    qrCodeDataURL // include QR code in response
  };
};


const updatePaymentStatus = async (payload) => {
    try {
        const payment = await Payment.findOneAndUpdate(
          { _id: payload.ID, user: payload._id }, // check both ID and user
          { status: payload.status },
          { new: true }
        );
    
        if (!payment) return res.status(404).json({ error: "Payment not found or unauthorized" });
    
        return payment;
    } catch (error) {
        return new Error("Failed to update payment");
      }
  };


  

export default {createPayment , updatePaymentStatus};
