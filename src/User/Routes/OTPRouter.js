// routes/otpRoutes.js

const express = require('express');
const router = express.Router();
const otpController = require('../Controller/otpController');

// Route to send OTP
router.post('/send', otpController.sendOTP);

// Route to verify OTP
router.post('/verify', otpController.verifyOTP);

module.exports = router;


// routes/otpRoutes.js

// const express = require('express');
// const router = express.Router();
// const otpController = require('../Controller/otpController');

// router.post('/send', otpController.sendOTP);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const otpController = require('../Controller/otpController');

// // Route to send OTP
// router.post('/send-otp', otpController.sendOTP);

// // Route to verify OTP
// router.post('/verify-otp', otpController.verifyOTP);

// module.exports = router;
