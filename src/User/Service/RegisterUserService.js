const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = [
        'UserId','UserGuid', 'PhoneNumber', 'UserTypeId', 'IsActive', 'CreatedBy', 'UpdatedBy', 'ProfileGuid',
        'FirstName', 'LastName', 'DOB', 'GenderTypeId',
        'AddressGuid', 'AddressLine1', 'AddressLine2', 'City', 'State', 'ZipCode', 'Country',
        'AddressTypeId'
    ];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};

module.exports = {
    SaveUpdateUser: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const validationError = validateParams(data);
                if (validationError) {
                    return reject(validationError);
                }

                pool.query(
                    'CALL SaveUpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, @output_status, @output_message)',
                    [
                        data.UserId,
                        data.UserGuid,
                        data.UserTypeId,
                        data.UserProfileId,
                        data.ProfileGuid,
                        data.FirstName,
                        data.LastName,
                        data.DOB,
                        data.PhoneNumber,
                        data.IsActive,
                        data.UserAddressId,
                        data.AddressGuid,
                        data.AddressLine1,
                        data.AddressLine2,
                        data.City,
                        data.State,
                        data.Country,
                        data.ZipCode,
                        data.AddressTypeId,
                        data.GenderTypeId,
                        data.CreatedBy,
                        data.UpdatedBy
                    ],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        // Fetch output parameters
                        pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve({
                                status: rows[0].status,
                                message: rows[0].message
                            });
                        });
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    },

    GetAllUser: () => {
        return new Promise((resolve, reject) => {
            try {
             pool.query('CALL GetAllUser(@output_status, @output_message)', (error, results) => {
                //pool.query('SELECT * FROM employees;', (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    // Fetch output parameters
                    pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
                            users: results,
                            status: rows[0].status,
                            message: rows[0].message
                        });
                    });
                });
            } catch (e) {
                console.error("Error in GetAllUser:", e);
                reject(e);
            }
        });
    },

     GetSingleUser : (SingleUser) => {
        return new Promise((resolve, reject) => {
            try {
                // Execute the stored procedure with input parameters
                pool.query('CALL GetSingleUser(?, ?, @output_status, @output_message)', [SingleUser.UserID, SingleUser.UserGuid], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    // Fetch output parameters
                    pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        // Resolve with the user details and status/message
                        console.log("userss",results)
                        resolve({
                            user: results[0], // Assuming results[0] contains the user data
                            status: rows[0].status,
                            message: rows[0].message
                        });
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
     },

    //  GetSingleUser: (SingleUser) => {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             console.log("S",SingleUser);
    //             var s,m;
    //             pool.query('CALL GetSingleUser(?, ?, @output_status, @output_message)', [SingleUser.UserID, SingleUser.UserGuid,s,m], (error, results) => {
    //                 if (error) {
    //                     return reject(error);
    //                 }
    //                 console.log("SingleUser", results);
    //                 resolve(results[0],
    //                     {
    //                         status:200,
    //                         message :"User Get Sucessfully "
    //                     }
    //                 );
    //             });
                
               
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // },

    DeleteUser: (Delete) => {
        return new Promise((resolve, reject) => {
            try {
                pool.query('CALL UserDelete(?, ?, @output_status, @output_message)', [Delete.UserId, Delete.UserGuid], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    // Fetch output parameters
                    pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
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
};
