const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = [
        'UserGuid', 'PhoneNumber', 'UserTypeId', 'IsActive', 'CreatedBy', 'UpdatedBy', 'ProfileGuid',
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
                    if (error) {
                        return reject(error);
                    }
                    // Fetch output parameters
                    pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
                            users: results[0],
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

    GetSingleUser: (ID, UserGuid) => {
        return new Promise((resolve, reject) => {
            try {
                pool.query('CALL GetSingleUser(?, ?, @output_status, @output_message)', [ID, UserGuid], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    // Fetch output parameters
                    pool.query('SELECT @output_status AS status, @output_message AS message', (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
                            user: results[0][0], // Assuming the result is a single user object
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
