const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = ['UserId', 'BarId', 'CheckInDetail', 'CheckInGuid', 'CreatedBy', 'UpdatedBy'];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};

module.exports = {
    SaveUpdateCheckIn: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const validationError = validateParams(data);
                if (validationError) {
                    console.log(validationError);
                    return reject(validationError);
                }

                pool.query(
                    'CALL SaveUpdateCheckIn(?, ?, ?, ?, ?, ?, ?, @status, @message)',
                    [
                        data.UserCheckInDetailId,
                        data.UserId,
                        data.BarId,
                        data.CheckInDetail,
                        data.CheckInGuid,
                        data.CreatedBy,
                        data.UpdatedBy
                    ],
                    (error, results) => {
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
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    },

    GetAllCheckIn: (UserId) => {
        return new Promise((resolve, reject) => {
            try {
                pool.query('CALL GetAllCheckIn(?, @status, @message)', [UserId], (error, results) => {
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
                console.error("Error in GetAllCheckIn:", e);
                reject(e);
            }
        });
    },

    GetSingleCheckIn: (SingleData) => {
        return new Promise((resolve, reject) => {
            try {
                pool.query('CALL GetSingleCheckIn(?, ?, ?, ?, @status, @message)', [
                    SingleData.UserCheckInDetailId,
                    SingleData.CheckInGuid,
                    SingleData.UserId,
                    SingleData.BarId
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
                console.error("Error in GetSingleCheckIn:", e);
                reject(e);
            }
        });
    },

    DeleteCheckIn: (Delete) => {
        return new Promise((resolve, reject) => {
            try {
                pool.query('CALL CheckInDelete(?, ?, ?, ?, @status, @message)', [
                    Delete.UserCheckInDetailId,
                    Delete.CheckInGuid,
                    Delete.UserId,
                    Delete.BarId
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
                console.error("Error in DeleteCheckIn:", e);
                reject(e);
            }
        });
    }
};
