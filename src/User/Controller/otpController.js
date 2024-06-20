// controllers/otpController.js

const otpService = require('../Service/OTPService');

async function sendOTP(req, res) {
    const { phoneNumber } = req.body;

    try {
        const otp = otpService.generateOTP();
        otpService.storeOTP(phoneNumber, otp);
        console.log("phoneNumber",phoneNumber)
console.log("ServiceOTP",otp)
        // For simplicity, in a real application, you'd send the OTP via SMS or another channel
        res.status(200).json({ OTP:otp , message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
}

async function verifyOTP(req, res) {
    const { phoneNumber, otp } = req.body;

    try {
        const isVerified = otpService.verifyOTP(phoneNumber, otp);

        if (isVerified) {
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ error: 'OTP verification failed' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
}

module.exports = {
    sendOTP,
    verifyOTP
};



// // controllers/otpController.js

// const otpService = require('../Service/OTPService');

// async function sendOTP(req, res) {
//     const { phoneNumber } = req.body;

//     try {
//         const otp = await otpService.generateOTP();
//         const sent = await otpService.sendOTP(phoneNumber, otp);

//         if (sent) {
//             res.status(200).json({ message: 'OTP sent successfully' });
//         } else {
//             res.status(500).json({ error: 'Failed to send OTP' });
//         }
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// module.exports = {
//     sendOTP
// };




// // controllers/otpController.js

// const otpService = require('../Service/OTPService');
// const response = require('../../../response');

// // Endpoint controller to send OTP
// async function sendOTP(req, res) {
 
//     const { phoneNumber } = req.body;
// console.log("SendOTP",phoneNumber)
//     if (!phoneNumber) {
//         return response.error(res, 400, 'Phone number is required');
//     }

//     try {
//         const otp = otpService.generateOTP();
//         const otpSent = await otpService.sendOTP(phoneNumber, otp);

//         if (otpSent) {
//             return response.success(res, { message: 'OTP sent successfully' });
//         } else {
//             return response.error(res, 500, 'Failed to send OTP');
//         }
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         return response.error(res, 500, 'Internal server error');
//     }
// }

// // Endpoint controller to verify OTP
// function verifyOTP(req, res) {
//     const { phoneNumber, userEnteredOTP } = req.body;

//     if (!phoneNumber || !userEnteredOTP) {
//         return response.error(res, 400, 'Phone number and OTP are required');
//     }

//     // Assume OTP verification logic here
//     // In real application, validate OTP against stored OTP or using Twilio Verify API

//     // Simulating OTP verification
//     const isOTPValid = (userEnteredOTP === '123456'); // Replace with actual verification logic

//     if (isOTPValid) {
//         return response.success(res, { message: 'OTP verification successful' });
//     } else {
//         return response.error(res, 400, 'OTP verification failed');
//     }
// }

// module.exports = {
//     sendOTP,
//     verifyOTP
// };
