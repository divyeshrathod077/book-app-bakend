const express = require("express");
const { makePayment } = require("./payment.controller.js");

const router = express.Router();

// dummy payment route
router.post("/", makePayment);

module.exports = router;