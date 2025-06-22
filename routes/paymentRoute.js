import express from 'express'
const router = express.Router();
import paymentController from "../controllers/paymentController.js";
import authMiddleware from "../Middlewares/authMiddleware.js"
router.use(express.json());


router.post("/create", authMiddleware,paymentController.createPayment);
router.patch("/update/:id", authMiddleware,paymentController.updatePaymentStatus);

export default router;
