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
                console.log(data);
                const validationError = validateParams(data);
                if (validationError) {
                    return reject(validationError),
                    console.log(validationError)
                }
           
                var s ,m;
                pool.query(
                    'CALL SaveUpdatePost(?, ?, ?, ?, ?, ?, ?, @?, @?)',
                    [
                        data.ProfilePostId, 
                        data.PostGuid, 
                        data.UserId, 
                        data.PostTitle,
                        data.PostDetail, 
                        data.CreatedBy,
                        data.UpdatedBy,
                            s, m
                    ],
                    (error, results) => {
                        if (error) {
                            return reject(results)
                            message : results.message;
                            
                        }
                        const message = results.message || results.errorMessage; // check for both message and error message
                        const status = results.status || results.errorstatus;
                        resolve({
                          status: status,
                          message,
                        });
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    },

    GetAllProfilePost: (UserId) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("S",UserId);
                var s, m;
                pool.query(`call GetAllPost( ?, @?,@?)`, [UserId,s, m], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log("ProfilePost", results);
                    resolve(results[0],
                        {
                            status:200,
                            message :"Profile Post Get Sucessfully "
                        }
                    );
                });
            } catch (e) {
                console.error("Error in Profile Post:", e);
                reject(e);
            }
        });
    },

    GetSingleProfilePost: (SingleData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("S",SingleData);
                var s,m;
                pool.query('CALL GetSinglePost(?,?,?,@?,@?)', [SingleData.ProfilePostId,SingleData.PostGuid,SingleData.UserId,s,m], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log("SingleProfilePost", results);
                    resolve(results[0],
                        {
                            status:200,
                            message :"Profile Post Get Sucessfully "
                        }
                    );
                });
                
               
            } catch (error) {
                reject(error);
            }
        });
    },

    DeleteProfilePost: (Delete) => {
        return new Promise((resolve, reject) => {
            try {
      
               console.log("S",Delete);
                var s,m;
                pool.query('CALL PostDelete(?,?,?, @?,@?)', [Delete.ProfilePostId,Delete.PostGuid,Delete.UserId,s,m], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    const outputParams = results[0]; // Retrieve the output parameters

                    resolve({
                        status:200,
                        message :"Profile Post Delete Sucessfully "
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
};
