// services/otpService.js
const jwt = require('jsonwebtoken');
const pool = require('../../../DataBase/Connection'); // Adjust path as per your project structure

let otpStorage = {}; // In-memory storage for OTPs
let TokenStorage= {};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}


function storeOTP(phoneNumber, otp) {
    otp=123456;
    otpStorage[phoneNumber] = otp.toString();
    console.log("OTPstorage", otpStorage);
    //SaveUser: (phoneNumber);
}

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
                            // Resolve with the fetched parameters
                            resolve({
                                // status: results[0][0].status,
                                // message: results[0][0].message,
                                userId: rows[0].UserId,
                                userGuid: rows[0].UserGuid,
                                userTypeId: rows[0].UserTypeId
                            });
                        } else {
                            reject(new Error('User not found')); // Handle case where user is not found
                        }
                    });
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}


function verifyOTP(phoneNumber, otp) {
    const storedOTP = otpStorage[phoneNumber];
    if (storedOTP === otp.toString()) {
        delete otpStorage[phoneNumber]; // Clear OTP after successful verification
        return true;
    }
    return false;
}
function GetSingleUser(singleUser) {
    console.log("Single",singleUser)
    return new Promise((resolve, reject) => {
        try {
            pool.query('CALL GetTokan(?, @output_status, @output_message)', [singleUser.phoneNumber], (error, results) => {
                if (error) {
                    return reject(error);
                }
                //const user = results[0];
                console.log("UserList",results[0])
            
                const token = generateToken(results[0]);
                TokenStorage[token]=token.toString();
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
    const token = jwt.sign(payload,  process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' }); // Adjust expiration as needed

    return token;
}
function verifyToken(token) {
    console.log("Stoken",token)
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
    verifyToken,
    SaveUser

};
