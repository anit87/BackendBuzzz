// services/otpService.js

let otpStorage = {}; // In-memory storage for OTPs

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

function storeOTP(phoneNumber, otp) {
    otpStorage[phoneNumber] = otp.toString();
    console.log("OTPstorage",otpStorage);
}

function verifyOTP(phoneNumber, otp) {
    const storedOTP = otpStorage[phoneNumber];
    if (storedOTP === otp.toString()) {
        delete otpStorage[phoneNumber]; // Clear OTP after successful verification
        return true;
    }
    return false;
}

module.exports = {
    generateOTP,
    storeOTP,
    verifyOTP
};





// require('dotenv').config();

// let fetch;
// try {
//     fetch = require('node-fetch');
// } catch (error) {
//     fetch = require('node-fetch').default;
// }

// const apiKey = process.env.NEXMO_API_KEY;
// const apiSecret = process.env.NEXMO_API_SECRET;
// const fromNumber = process.env.NEXMO_PHONE_NUMBER;

// async function generateOTP() {
//     return Math.floor(100000 + Math.random() * 900000);
// }

// async function sendOTP(phoneNumber, otp) {
//     try {
//         const response = await fetch('https://rest.nexmo.com/sms/json', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
//             },
//             body: `from=${encodeURIComponent(fromNumber)}&to=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(`Your OTP is: ${otp}`)}`
//         });

//         const responseData = await response.json();
//         if (responseData.messages[0].status === '0') {
//             console.log(`OTP sent successfully to ${phoneNumber}`);
//             return true;
//         } else {
//             console.error(`Failed to send OTP to ${phoneNumber}`, responseData.messages[0]['error-text']);
//             return false;
//         }
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         return false;
//     }
// }

// module.exports = {
//     generateOTP,
//     sendOTP
// };
