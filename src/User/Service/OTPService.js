// services/otpService.js
const jwt = require('jsonwebtoken');
const pool = require('../../../DataBase/Connection'); // Adjust path as per your project structure

let otpStorage = {}; // In-memory storage for OTPs

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

function storeOTP(phoneNumber, otp) {
    otpStorage[phoneNumber] = otp.toString();
    console.log("OTPstorage", otpStorage);
}

function verifyOTP(phoneNumber, otp) {
    const storedOTP = otpStorage[phoneNumber];
    if (storedOTP === otp.toString()) {
        delete otpStorage[phoneNumber]; // Clear OTP after successful verification
        return true;
    }
    return false;
}
function GetSingleUser(Single) {
    console.log("Single",Single)
    return new Promise((resolve, reject) => {
        try {
            pool.query('CALL GetSingleUser(?, ?, @output_status, @output_message)', [Single.UserId, Single.UserGuid], (error, results) => {
                if (error) {
                    return reject(error);
                }
                //const user = results[0];
                console.log("UserList",results[0])
                const token = generateToken(results[0]);
                 console.log("token",token)
                // Fetch output parameters
                pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    // Resolve with the user details, token, status, and message
                    resolve({
                       // user: results[0],
                        token: token,
                        status: rows[0].status,
                        message: rows[0].message
                    });
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}

function generateToken(user) {
    // Define your payload (customize as per your application's needs)
    const payload = {
        userId: user.UserId,
        userGuid: user.UserGuid,
        // Add more user-related data as needed
    };

    // Generate and sign the token with a secret key
    const token = jwt.sign(payload,  process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed

    return token;
}
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}


module.exports = {
    generateOTP,
    storeOTP,
    verifyOTP,
    GetSingleUser ,
    verifyToken
};
