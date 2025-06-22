import paymentService from "../Services/paymentService.js";

const createPayment = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const userId = req.user.user_id;
    const payment = await paymentService.createPayment({ name, mobile,userId });
    res.status(201).json({ success: true, paymentId:payment._id,payment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const _id= req.user.user_id;
        const status=req.body.status;
        const payload={
            ID : id,
            _id : _id,
            status:status
        }
        const payment = await paymentService.updatePaymentStatus(payload);
    
        if (!payment) return res.status(404).json({ error: "Payment not found or unauthorized" });
    
        res.status(200).json({
            status:true,
            payment:payment});
      } catch (error) {
        res.status(500).json({ 
            status:false,
            error: "Failed to update payment" });
      }
    };



export default {createPayment,updatePaymentStatus}