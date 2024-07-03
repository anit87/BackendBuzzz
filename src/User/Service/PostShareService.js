const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = [
        'ProfilePostShareId', 'ProfilePostId', 'UserId', 'CreatedBy', 'UpdatedBy'
    ];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};

module.exports = {
    SaveUpdatePostShare: (data) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(data);
                const validationError = validateParams(data);
                if (validationError) {
                    console.log(validationError);
                    return reject(validationError);
                }

                pool.query(
                    'CALL SaveUpdatePostShare(?, ?, ?, ?, ?, ?, @outputStatus, @outputMessage)',
                    [
                        data.ProfilePostShareId,
                        data.ProfilePostId,
                        data.UserId,
                        data.CreatedBy,
                        data.UpdatedBy,
                        data.IsShare
                    ],
                    (error, results) => {
                        if (error) {
                            return reject({ status: 500, message: error.message });
                        }

                        // Assuming output parameters are returned in the results
                        const output = results;
                        console.log(output);
                        resolve({
                            status: output.outputStatus || 200,
                            message: output.outputMessage || 'Post Share save successfully'
                        });
                    }
                );
            } catch (e) {
                console.error("Error in Post Share:", e);
                reject({ status: 500, message: e.message });
            }
        });
    },

    GetAllPostShare: (GetAll) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("S", GetAll);
                pool.query(
                    'CALL GetAllPostShare(?, ?, @outputStatus, @outputMessage)',
                    [GetAll.UserId, GetAll.ProfilePostId],
                    (error, results) => {
                        if (error) {
                            return reject({ status: 500, message: error.message });
                        }

                        console.log("Post Share", results);
                        resolve(results,{
                          
                            status: 200,
                            message: "Post Share Get Successfully"
                        });
                    }
                );
            } catch (e) {
                console.error("Error in Post Share:", e);
                reject({ status: 500, message: e.message });
            }
        });
    },

    GetSinglePostShare: (SingleData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("S", SingleData);
                pool.query(
                    'CALL GetSinglePostShare(?, ?, ?, @outputStatus, @outputMessage)',
                    [SingleData.ProfilePostShareId, SingleData.ProfilePostId, SingleData.UserId],
                    (error, results) => {
                        if (error) {
                            return reject({ status: 500, message: error.message });
                        }

                        console.log("SingleProfilePostShare", results);
                        resolve({
                            data: results[0],
                            status: 200,
                            message: "Post Share Get Successfully"
                        });
                    }
                );
            } catch (error) {
                console.error("Error in Post Share:", error);
                reject({ status: 500, message: error.message });
            }
        });
    },

    DeletePostShare: (Delete) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("S", Delete);
                pool.query(
                    'CALL PostShareDelete(?, ?, ?, @outputStatus, @outputMessage)',
                    [Delete.ProfilePostShareId, Delete.ProfilePostId, Delete.UserId],
                    (error, results) => {
                        if (error) {
                            return reject({ status: 500, message: error.message });
                        }

                        console.log("DeletePostShare", results);
                        resolve({
                            status: 200,
                            message: "Post Share Delete Successfully"
                        });
                    }
                );
            } catch (e) {
                console.error("Error in Post Share:", e);
                reject({ status: 500, message: e.message });
            }
        });
    }
};
