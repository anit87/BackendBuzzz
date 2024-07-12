// controllers/otpController.js

const otpService = require('../Service/OTPService');

async function sendOTP(req, res) {
    const { phoneNumber } = req.body;
console.log("CphoneNumber",phoneNumber)
    try {
        const otp = await otpService.generateOTP(); // Generate OTP asynchronously
        await otpService.storeOTP(phoneNumber, otp); // Store OTP for the phoneNumber asynchronously
        
        // Log for verification (optional)
        console.log("Phone Number:", phoneNumber);
        console.log("OTP:", otp);

        const userData = await otpService.SaveUser(phoneNumber);// Create user after OTP is successfully stored

        res.status(200).json({ status: 200, message: 'OTP sent successfully',userData });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
}

// Function to create a user using phone number after OTP verification
async function SaveUser(phoneNumber) {
    try {
        console.log("Creating user with phone number:", phoneNumber);
        const userData = await otpService.SaveUser(phoneNumber); // Assuming createUser handles OTP verification and user creation
        console.log('User created successfully:', userData);
        return userData;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Propagate the error to the caller
    }
}

async function verifyOTP(req, res) {
    const { phoneNumber, otp } = req.body;

    try {
        
        const isVerified = otpService.verifyOTP(phoneNumber, otp);

        if (isVerified) {
            // If OTP is verified successfully, proceed to fetch single user
            const singleUser = {phoneNumber};
           
            console.log("singleuser",singleUser)
            const userData = await otpService.GetSingleUser(singleUser);
            // res.status(200).json({ status: 200, message: 'OTP verified successfully', user: userData });
            res.status(200).json({ status: 200, message: 'OTP verified successfully' ,Tokan: userData.token});
           
        } else {
            res.status(400).json({ error: 'OTP verification failed' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ status: 500, error: 'Failed to verify OTP' });
    }
}
async function verifyToken(req, res) {
    const  token  = req.body.token;
console.log("Ctokan",token)
    try {
        const decoded = await otpService.verifyToken(token);
        res.status(200).json({ status: 200, message: 'Token verified successfully', decoded });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ status: 500, error: 'Failed to verify token' });
    }
}

module.exports = {
    sendOTP,
    verifyOTP,
    verifyToken
};



