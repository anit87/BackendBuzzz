const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = [
        'UserId', 'BarName', 'BusinessName', 'ContactNumber', 'BarGUID', 'AddressGuid',
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

                pool.query(
                    'CALL SaveUpdateBar(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @status, @message, @output)',
                    [
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
                    ],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }

                        pool.query('SELECT @status AS status, @message AS message, @output AS output', (error, outputResults) => {
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
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    },

    GetAllBar: (UserId) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("GetAllBar request for UserId:", UserId);

                pool.query('CALL GetAllBar(?, @status, @message)', [UserId], (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    pool.query('SELECT @status AS status, @message AS message', (error, outputResults) => {
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
                console.log("GetSingleBar request data:", SingleData);

                pool.query('CALL GetSingleBar(?, ?, ?, ?, ?, @status, @message)', [
                    SingleData.BarId,
                    SingleData.BarGuid,
                    SingleData.UserId,
                    SingleData.UserAddressId,
                    SingleData.BarworkingDayId
                ], (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    pool.query('SELECT @status AS status, @message AS message', (error, outputResults) => {
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
                console.error("Error in GetSingleBar:", e);
                reject(e);
            }
        });
    },

    DeleteBar: (DeleteData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("DeleteBar request data:", DeleteData);

                pool.query('CALL BarDelete(?, ?, ?, ?, ?, ?, @status, @message)', [
                    DeleteData.BarId,
                    DeleteData.BarGuid,
                    DeleteData.UserId,
                    DeleteData.UserAddressId,
                    DeleteData.AddressGuid,
                    DeleteData.BarworkingDayId
                ], (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    pool.query('SELECT @status AS status, @message AS message', (error, outputResults) => {
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
