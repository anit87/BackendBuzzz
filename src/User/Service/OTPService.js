// services/otpService.js
const jwt = require('jsonwebtoken');
const pool = require('../../../DataBase/Connection'); // Adjust path as per your project structure

let otpStorage = {}; // In-memory storage for OTPs
let TokenStorage = {}; // In-memory storage for tokens

// Function to generate a 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to reset OTP for a given phone number
function resetOTP(phoneNumber) {
    delete otpStorage[phoneNumber];
    console.log(`OTP for ${phoneNumber} has been reset.`);
}

// Function to store OTP for a given phone number
function storeOTP(phoneNumber, otp) {
    otp=123456
    const timestamp = Date.now();
    otpStorage[phoneNumber] = { otp: otp.toString(), PhoneNumber: phoneNumber.toString() };
    console.log("OTP storage:", otpStorage);

    // Set a timeout to reset the OTP after 2 minutes (120000 milliseconds)
    setTimeout(() => {
        resetOTP(phoneNumber);
    }, 2 * 60 * 1000);
}

// Function to save user details
function SaveUser(phoneNumber) {
    return new Promise((resolve, reject) => {
        console.log("SaveUser", phoneNumber);

        try {
            pool.query(
                'CALL CreateUser(?, @output_status, @output_message, @userId, @userGuid, @userTypeId)',
                [phoneNumber],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    // Fetch user details after the stored procedure call
                    pool.query('SELECT UserId, UserGuid, UserTypeId FROM userbasic WHERE PhoneNumber = ? AND IsDeleted = 0', [phoneNumber], (err, rows) => {
                        if (err) {
                            return reject(err);
                        }

                        console.log("rows", rows);
                        if (rows.length > 0) {
                            resolve({
                                userId: rows[0].UserId,
                                userGuid: rows[0].UserGuid,
                                userTypeId: rows[0].UserTypeId
                            });
                        } else {
                            reject(new Error('User not found'));
                        }
                    });
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}

// Function to verify the OTP
function verifyOTP(phoneNumber, otp) {
    const storedOTP = otpStorage[phoneNumber];
    console.log("storedOTP", storedOTP);
    if (storedOTP && storedOTP.otp === otp.toString()) {
        delete otpStorage[phoneNumber]; // Clear OTP after successful verification
        return true;
    }
    return false;
}

// Function to get a single user and generate a token
function GetSingleUser(singleUser) {
    console.log("Single", singleUser);
    return new Promise((resolve, reject) => {
        try {
            pool.query('CALL GetTokan(?, @output_status, @output_message)', [singleUser.phoneNumber], (error, results) => {
                if (error) {
                    return reject(error);
                }

                console.log("UserList", results[0]);
                const token = generateToken(results[0]);
                TokenStorage[token] = { ...results[0] }; // Store token in TokenStorage

                console.log("token", token);
                pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve({
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

// Function to generate a JWT token
function generateToken(user) {
    const payload = {
        userId: user.UserId,
        userGuid: user.UserGuid,
        // Add more user-related data as needed
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' }); // Adjust expiration as needed
    return token;
}

// Function to verify a JWT token
function verifyToken(token) {
    console.log("Stoken", token);
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
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
    GetSingleUser,
    verifyToken,
    SaveUser,
    TokenStorage
};
