// controllers/otpController.js

const otpService = require('../Service/OTPService');

async function sendOTP(req, res) {
    const { phoneNumber } = req.body;
    //singleUser = {UserId:req.UserId,UserGuid:req.UserGuid}

    try {
        const otp = otpService.generateOTP();
        otpService.storeOTP(phoneNumber, otp);
        console.log("phoneNumber",phoneNumber)
         console.log("ServiceOTP",otp)
       
        // For simplicity, in a real application, you'd send the OTP via SMS or another channel
       // res.status(200).json({ OTP:otp , message: 'OTP sent successfully' });
       res.status(200).json({ Status:200 , message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
}
async function verifyOTP(req, res) {
    const { phoneNumber, otp, UserId, UserGuid } = req.body;

    try {
        const isVerified = otpService.verifyOTP(phoneNumber, otp);

        if (isVerified) {
            // If OTP is verified successfully, proceed to fetch single user
            const singleUser = { UserId: UserId, UserGuid: UserGuid };
           
            console.log("singleuser",singleUser)
            const userData = await otpService.GetSingleUser(singleUser);
            // Respond with user data along with verification status
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
    const { token } = req.body;

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



