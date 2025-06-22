import express from 'express';
import authController from '../controllers/auth.controller.js'

const router = express.Router();
router.use(express.json());


router.post("/signup",authController.signup);
router.post("/login", authController.login);
router.post("/sendOtp", authController.sendOtp);
router.post("/verifyOtp", authController.verifyOtp);
// router.post('/payment',authController.payment);
// router.post('create-order',authController.createOrder);
// router.post('verify-payment',authController.verifyPayment);



export default router;