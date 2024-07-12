const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = [
        'PostGuid', 'UserId','PostTitle', 'PostDetail', 'CreatedBy', 'UpdatedBy'
    ];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};

module.exports = {
    SaveUpdateProfilePost: (data) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(data)
                const validationError = validateParams(data);
                if (validationError) {
                    return reject(validationError);
                }
               
                var s, m;
                pool.query(
                    'CALL SaveUpdatePost(?, ?, ?, ?, ?, ?, ?,?,?, @s, @m)',
                    [
                        data.ProfilePostId, 
                        data.PostGuid, 
                        data.UserId, 
                        data.PostTitle,
                        data.PostDetail, 
                        data.CreatedBy,
                        data.UpdatedBy,
                        data.BarId,
                        data.IsActive,
                        s,m
                    ],
                    (error, results, fields) => {
                        if (error) {
                            console.error('Error in calling SaveUpdatePost:', error);
                            return reject(error);
                        }
    
                        // Fetch OUT parameters from the stored procedure
                        pool.query('SELECT @s as status, @m as message', (err, result) => {
                            if (err) {
                                console.error('Error in fetching OUT parameters:', err);
                                return reject(err);
                            }
    
                            const { status, message } = result[0];
                            resolve({
                                status: status || 200, // Default status to 200 if not set by the procedure
                                message: message || 'Profile Post Saved Successfully' // Default message if not set
                            });
                        });
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    },
    

     GetAllProfilePost : (AllList) => {
        return new Promise((resolve, reject) => {
            try {
                var s, m;
                console.log("AllList",AllList)
                pool.query('CALL GetAllPost2(?,?,@s,@m)', [AllList.UserId, AllList.BarId,s,m], (error, results, fields) => {
                    if (error) {
                        console.error('Error in calling stored procedure:', error);
                        return reject(error);
                    }
                    
                    // Fetch OUT parameters from the stored procedure
                    pool.query('SELECT @s as status, @m as message', (err, result) => {
                        if (err) {
                            console.error('Error in fetching OUT parameters:', err);
                            return reject(err);
                        }
    
                        const { status, message } = results;
                        console.log('ProfilePost results:', results);
                        resolve({
                            data: results[0], // Assuming your stored procedure returns data in results[0]
                            status: status || 200, // Default status to 200 if not set by the procedure
                            message: message || 'Profile Post Get Successfully' // Default message if not set
                        });
                    });
                });
            } catch (e) {
                console.error('Error in GetAllProfilePost:', e);
                reject(e);
            }
        });
    },
    

    GetSingleProfilePost : (SingleData) => {
        return new Promise((resolve, reject) => {
            try {
                var s, m;
                console.log("SSingleData",SingleData)
                pool.query('CALL GetSinglePost(?,?,?,?,@s,@m)', [SingleData.ProfilePostId, SingleData.PostGuid, SingleData.UserId,SingleData.BarId, s,m], (error, results, fields) => {
                    if (error) {
                        console.error('Error in calling stored procedure:', error);
                        return reject(error);
                    }
                    
                    // Fetch OUT parameters from the stored procedure
                    pool.query('SELECT @s as status, @m as message', (err, result) => {
                        if (err) {
                            console.error('Error in fetching OUT parameters:', err);
                            return reject(err);
                        }
    
                        const { status, message } = result[0];
                        console.log('SingleProfilePost results:', results);
                        resolve({
                            data: results[0], // Assuming your stored procedure returns data in results[0]
                            status: status || 200, // Default status to 200 if not set by the procedure
                            message: message || 'Profile Post Get Successfully' // Default message if not set
                        });
                    });
                });
            } catch (e) {
                console.error('Error in GetSingleProfilePost:', e);
                reject(e);
            }
        });
    },

    DeleteProfilePost : (Delete) => {
        return new Promise((resolve, reject) => {
            try {
                var s, m;
                pool.query('CALL PostDelete(?,?,?,@s,@m)', [Delete.ProfilePostId, Delete.PostGuid, Delete.UserId], (error, results, fields) => {
                    if (error) {
                        console.error('Error in calling stored procedure:', error);
                        return reject(error);
                    }
                    
                    // Fetch OUT parameters from the stored procedure
                    pool.query('SELECT @s as status, @m as message', (err, result) => {
                        if (err) {
                            console.error('Error in fetching OUT parameters:', err);
                            return reject(err);
                        }
    
                        const { status, message } = result[0];
                        console.log('DeleteProfilePost results:', results);
                        resolve({
                            status: status || 200, // Default status to 200 if not set by the procedure
                            message: message || 'Profile Post Delete Successfully' // Default message if not set
                        });
                    });
                });
            } catch (e) {
                console.error('Error in DeleteProfilePost:', e);
                reject(e);
            }
        });
    }
    
};
