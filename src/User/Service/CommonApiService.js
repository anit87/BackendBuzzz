const pool = require('../../../DataBase/Connection');

module.exports = {
    GetUserType: (callBack) => {
        try {
            var s = null;
            var m = null;
            pool.query(`call GetAllUserType(@status, @message)`, [s, m], (error, results) => {
                if (error) {
                    return callBack(error);
                }

                // Retrieve status and message
                pool.query('SELECT @status AS status, @message AS message', (err, statusResults) => {
                    if (err) {
                        return callBack(err);
                    }

                    const status = statusResults[0].status;
                    const message = statusResults[0].message;

                    console.log("UserType", results);

                    return callBack(null, {
                        status: status,
                        message: message,
                        data: results
                    });
                });
            });
        } catch (e) {
            console.error("Error in GetUserType:", e);
            return callBack(e);
        }
    },

    GetGender: (callBack) => {
        try {
            var s = null;
            var m = null;
            pool.query(`call GetAllGenderType(@status, @message)`, [s, m], (error, results) => {
                if (error) {
                    return callBack(error);
                }

                pool.query('SELECT @status AS status, @message AS message', (err, statusResults) => {
                    if (err) {
                        return callBack(err);
                    }

                    const status = statusResults[0].status;
                    const message = statusResults[0].message;

                    console.log("Gender", results);

                    return callBack(null, {
                        status: status,
                        message: message,
                        data: results[0]
                    });
                });
            });
        } catch (e) {
            console.error("Error in GetGender:", e);
            return callBack(e);
        }
    },

    GetAddressType: (callBack) => {
        try {
            var s = null;
            var m = null;
            pool.query(`call GetAllAddressType(@status, @message)`, [s, m], (error, results) => {
                if (error) {
                    return callBack(error);
                }

                pool.query('SELECT @status AS status, @message AS message', (err, statusResults) => {
                    if (err) {
                        return callBack(err);
                    }

                    const status = statusResults[0].status;
                    const message = statusResults[0].message;

                    console.log("Address", results);

                    return callBack(null, {
                        status: status,
                        message: message,
                        data: results
                    });
                });
            });
        } catch (e) {
            console.error("Error in GetAddressType:", e);
            return callBack(e);
        }
    },

    GetDays: (callBack) => {
        try {
            var s = null;
            var m = null;
            pool.query(`call GetAllDays(@status, @message)`, [s, m], (error, results) => {
                if (error) {
                    return callBack(error);
                }

                pool.query('SELECT @status AS status, @message AS message', (err, statusResults) => {
                    if (err) {
                        return callBack(err);
                    }

                    const status = statusResults[0].status;
                    const message = statusResults[0].message;

                    console.log("Days", results);

                    return callBack(null, {
                        status: status,
                        message: message,
                        data: results
                    });
                });
            });
        } catch (e) {
            console.error("Error in GetDays:", e);
            return callBack(e);
        }
    },

    GetStatus: (callBack) => {
        try {
            var s = null;
            var m = null;
            pool.query(`call GetAllAccountType(@status, @message)`, [s, m], (error, results) => {
                if (error) {
                    return callBack(error);
                }

                pool.query('SELECT @status AS status, @message AS message', (err, statusResults) => {
                    if (err) {
                        return callBack(err);
                    }

                    const status = statusResults[0].status;
                    const message = statusResults[0].message;

                    console.log("Status", results);

                    return callBack(null, {
                        data: results,
                        status: status,
                        message: message
                       
                    });
                });
            });
        } catch (e) {
            console.error("Error in GetStatus:", e);
            return callBack(e);
        }
    }
};
