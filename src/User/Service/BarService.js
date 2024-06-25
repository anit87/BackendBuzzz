const pool = require('../../../DataBase/Connection');

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
        var s,m,o
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
                    data.UpdatedBy,
                    s,m
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
                console.log("GetSingleBar request data:", SingleData);

                const sql = 'CALL GetSingleBar(?, ?, ?, ?, ?, @status, @message)';
                const values = [
                    SingleData.BarId,
                    SingleData.BarGuid,
                    SingleData.UserId,
                    SingleData.UserAddressId,
                    SingleData.BarworkingDayId
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
