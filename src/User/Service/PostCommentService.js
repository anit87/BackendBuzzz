const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = [
        'ProfilePostCommentId', 'ProfilePostId', 'UserId', 'CommentDetail', 'CreatedBy', 'UpdatedBy'
    ];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    SaveUpdatePostComment: async (data) => {
        try {
            console.log(data);
            const validationError = validateParams(data);
            if (validationError) {
                console.log(validationError);
                return Promise.reject(validationError);
            }

            const results = await executeQuery(
                'CALL SaveUpdatePostComment(?, ?, ?, ?, ?, ?, @status, @message)',
                [
                    data.ProfilePostCommentId,
                    data.ProfilePostId,
                    data.UserId,
                    data.CommentDetail,
                    data.CreatedBy,
                    data.UpdatedBy
                ]
            );

            const [output] = await executeQuery('SELECT @status AS status, @message AS message', []);

            return {
                status: output.status,
                message: output.message
            };
        } catch (error) {
            console.error("Error in SaveUpdatePostComment:", error);
            return Promise.reject(error);
        }
    },

    GetAllPostComment: async (UserId) => {
        try {
            console.log("GetAllPostComment for UserId:", UserId);

            const results = await executeQuery('CALL GetAllPostComment(?, @status, @message)', [UserId]);

            const [output] = await executeQuery('SELECT @status AS status, @message AS message', []);

            return {
                status: output.status,
                message: output.message,
                data: results[0]
            };
        } catch (error) {
            console.error("Error in GetAllPostComment:", error);
            return Promise.reject(error);
        }
    },

    GetSinglePostComment: async (SingleData) => {
        try {
            console.log("GetSinglePostComment request:", SingleData);

            const results = await executeQuery('CALL GetSinglePostComment(?, ?, ?, @status, @message)', [
                SingleData.ProfilePostCommentId,
                SingleData.ProfilePostId,
                SingleData.UserId
            ]);

            const [output] = await executeQuery('SELECT @status AS status, @message AS message', []);

            return {
                status: output.status,
                message: output.message,
                data: results[0]
            };
        } catch (error) {
            console.error("Error in GetSinglePostComment:", error);
            return Promise.reject(error);
        }
    },

    DeletePostComment: async (Delete) => {
        try {
            console.log("DeletePostComment request:", Delete);

            await executeQuery('CALL CommentDelete(?, ?, ?, @status, @message)', [
                Delete.ProfilePostCommentId,
                Delete.ProfilePostId,
                Delete.UserId
            ]);

            const [output] = await executeQuery('SELECT @status AS status, @message AS message', []);

            return {
                status: output.status,
                message: output.message
            };
        } catch (error) {
            console.error("Error in DeletePostComment:", error);
            return Promise.reject(error);
        }
    }
};
