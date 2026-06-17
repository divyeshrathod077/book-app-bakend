const Payment = require("./payment.model");
const Order = require("../orders/order.model");

const makePayment = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      productIds,
      amount
    } = req.body;

    console.log("REQ BODY:", req.body); 
    // 1. Create Payment
    const payment = new Payment({
      email,
      amount,
      status: "success",
      transactionId: "TXN_" + Date.now(),
    });

    const savedPayment = await payment.save();

    // 2. Create Order (FIXED)
    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      productIds,          //  correct
      totalPrice: amount,  //  correct
      paymentId: savedPayment._id,
    });

    const savedOrder = await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment successful & Order created",
      order: savedOrder,
    });

  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({
      success: false,
      message: error.message, // show real error
    });
  }
};

module.exports = { makePayment };