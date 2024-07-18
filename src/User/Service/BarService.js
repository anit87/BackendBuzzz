const pool = require('../../../DataBase/Connection');

const validateParams = (data) => {
    const requiredParams = [
        'UserId', 'BarName', 'BusinessName', 'ContactNumber', 
        'AddressLine1', 'AddressLine2', 'City', 'State', 'ZipCode', 'Country', 'AddressTypeId',
        'StatusTypeID', 'DayID', 'OpenTime', 'CloseTime'
    ];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};

module.exports = {
    SaveUpdateBar: (postData) => {
        console.log("Servicedata1:", postData);


        return new Promise((resolve, reject) => {
            try {
                const data = postData.data;
                if (!data) {
                    throw new Error('Data is undefined');
                }
                if (data.BarId == 0) {
                    data.BarID = 0;
                    data.BarGuid = '';
                    data.UserAddressId = 0;
                    data.AddressGuid = '';
                    reject({
                        status: -100,
                        message: "Parameters are invalid"
                    });
                    return;
                }
                    else
                    {
                       data.BarID!=0,data.BarGuid!='',data.UserAddressId!=0,data.AddressGuid!=''
                       reject({
                        status: -100,
                        message: "some parametrs are invalid"
                    });
                    }
              
    
                console.log("Data received:", data);
    
                // Save user-related data
                const saveUserQuery = `
                    CALL SaveUpdateBar2(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @status, @message, @output, @Barid);
                `;
                const userValues = [
                    data.BarID,
                    data.UserId,
                    data.ContactNumber,
                    data.BarName,
                    data.BusinessName,
                    data.BarGuid,
                    data.UserAddressId,
                    data.AddressTypeId,
                    data.AddressGuid,
                    data.AddressLine1,
                    data.AddressLine2,
                    data.City,
                    data.State,
                    data.ZipCode,
                    data.Country,
                    data.StatusTypeID
                ];
    
                pool.query(saveUserQuery, userValues, (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
    
                    const output = results;
                    resolve({
                        status: output.status,
                        message: output.message,
                        data: results,
                        barId2: output.BarId
                    });
    
                    // Retrieve the last inserted BarId
                    const getLastInsertIdQuery = `
                        SELECT LAST_INSERT_ID() as BarId FROM BarDetail WHERE UserId = ? AND IsDeleted = 0;
                    `;
                    pool.query(getLastInsertIdQuery, [data.UserId], (err, results) => {
                        if (err) {
                            reject(err);
                            return;
                        }
    
                        const barId2 = results[0]?.BarId;
                        if (!barId2) {
                            throw new Error('BarId not found');
                        }
    
                        // Check if dayData is defined
                        const dayDataArray = data.dayData;
                        if (!Array.isArray(dayDataArray)) {
                            throw new Error('dayData is not an array');
                        }
                        if(dayDataArray.BarworkingDayId==0)
                        {
                          dayData.BarkingDayId=0
                          reject({
                            status: -101,
                            message: "BarworkingDayId are invalid"
                        });
                        }
    
                        // Save working days data
                        const saveUserQuery2 = `
                            CALL SaveUpdateDay(?, ?, ?, ?, ?, ?, @status, @message);
                        `;
    
                        let completedQueries = 0;
    
                        for (let i = 0; i < dayDataArray.length; i++) {
                            const dayData = dayDataArray[i];
                            const workingDayValues = [
                                data.UserId,
                                barId2,
                                dayData.BarkingDayId,
                                dayData.DayID,
                                dayData.OpenTime,
                                dayData.CloseTime
                            ];
    
                            pool.query(saveUserQuery2, workingDayValues, (err, results) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
    
                                completedQueries++;
                                if (completedQueries === dayDataArray.length) {
                                    resolve({ success: true, message: 'Bar saved successfully' });
                                }
                            });
                        }
                    });
                });
            } catch (error) {
                console.error('Error saving bar:', error);
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
