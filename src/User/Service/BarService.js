const pool = require('../../../DataBase/Connection');

const validateParams = (data) => {
    const requiredParams = [
        'UserId', 'BarName', 'BusinessName', 'ContactNumber', 
        'AddressLine1', 'AddressLine2', 'City', 'State', 'ZipCode', 'Country', 'AddressTypeId',
        'StatusTypeID', 'DayID', 'OpenTime', 'CloseTime', 'CreatedBy', 'UpdatedBy'
    ];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};

module.exports = {
    SaveUpdateBar: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const validationError = validateParams(data);
                if (validationError) {
                    console.log(validationError);
                    return reject(validationError);
                }

                console.log("Save/Update Bar request data:", data);

                const sql = 'CALL SaveUpdateBar(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @status, @message,@output)';
                const values = [
                    data.BarID,
                    data.UserId,
                    data.ContactNumber,
                    data.BarName,
                    data.BusinessName,
                    data.BarGUID,
                    data.UserAddressId,
                    data.AddressTypeId,
                    data.AddressGuid,
                    data.AddressLine1,
                    data.AddressLine2,
                    data.City,
                    data.State,
                    data.ZipCode,
                    data.Country,
                    data.StatusTypeID,
                    data.BarworkingDayId,
                    data.DayID,
                    data.OpenTime,
                    data.CloseTime,
                    data.CreatedBy,
                    data.UpdatedBy
                ];

                pool.query(sql, values, (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    const statusQuery = 'SELECT @status AS status, @message AS message, @output AS output';
                    pool.query(statusQuery, (error, outputResults) => {
                        if (error) {
                            return reject(error);
                        }

                        const output = outputResults[0];
                        resolve({
                            status: output.status,
                            message: output.message,
                            data: results[0]
                        });
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    GetAllBar: (UserId) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("GetAllBar request for UserId:", UserId);

                const sql = 'CALL GetAllBar(?, @status, @message)';
                pool.query(sql, [UserId], (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    const statusQuery = 'SELECT @status AS status, @message AS message';
                    pool.query(statusQuery, (error, outputResults) => {
                        if (error) {
                            return reject(error);
                        }

                        const output = outputResults[0];
                        resolve({
                            status: output.status,
                            message: output.message,
                            data: results[0]
                        });
                    });
                });
            } catch (e) {
                console.error("Error in GetAllBar:", e);
                reject(e);
            }
        });
    },

    GetSingleBar: (SingleData) => {
        return new Promise((resolve, reject) => {
            try {
                // Execute the stored procedure with input parameters
                console.log("SingleData", SingleData);
                const sql = 'CALL GetSingleBar(?, ?, ?, ?, ?, ?, @status, @message)';
                const values = [
                    SingleData.BarId,
                    SingleData.BarGuid,
                    SingleData.UserId,
                    SingleData.UserAddressId,
                    SingleData.BarworkingDayId,
                    SingleData.AddressTypeId
                ];

                pool.query(sql, values, (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    // Fetch output parameters
                    pool.query('SELECT @status AS status, @message AS message', (err, rows) => {
                        if (err) {
                            return reject(err);
                        }

                        console.log("results", results);
                        resolve({
                            barDetails: results[0], // Assuming results[0] contains the bar data
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

    DeleteBar: (DeleteData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("DeleteBar request data:", DeleteData);

                const sql = 'CALL BarDelete(?, ?, ?, ?, ?, ?, @status, @message)';
                const values = [
                    DeleteData.BarId,
                    DeleteData.BarGuid,
                    DeleteData.UserId,
                    DeleteData.UserAddressId,
                    DeleteData.AddressGuid,
                    DeleteData.BarworkingDayId
                ];

                pool.query(sql, values, (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    const statusQuery = 'SELECT @status AS status, @message AS message';
                    pool.query(statusQuery, (error, outputResults) => {
                        if (error) {
                            return reject(error);
                        }

                        const output = outputResults[0];
                        resolve({
                            status: output.status,
                            message: output.message
                        });
                    });
                });
            } catch (e) {
                console.error("Error in DeleteBar:", e);
                reject(e);
            }
        });
    }
};
