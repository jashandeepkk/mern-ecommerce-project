import express from "express";
import razorpay from "../config/razorpay.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    let { amount } = req.body; // ✅ use let

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    // ✅ convert rupees → paise
    amount = Math.round(Number(amount) * 100);

    const options = {
      amount, // already converted
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;