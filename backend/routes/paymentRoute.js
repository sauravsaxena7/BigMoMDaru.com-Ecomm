
const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");

const router = express.Router();


const {isAuthenticatorUser} = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatorUser,processPayment);


router.route("/stripeapikey").get(isAuthenticatorUser,sendStripeApiKey);

module.exports = router;
