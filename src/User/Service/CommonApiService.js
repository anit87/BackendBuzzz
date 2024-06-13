const pool = require('../../../DataBase/Connection')

module.exports = {
    GetUserType: ( callBack) => {
        try {
            var s, m;
            pool.query(`call GetAllUserType(@?,@?) `, [s, m], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log("UserType", results);
                return callBack(null, results);
            });
        } catch (e) {
            console.error("Error in GetUserType:", e);
            return callBack(e);
        }
    },


    GetGender: (data, callBack) => {
        try {
            var s, m;
            pool.query(`call GetAllGenderType(@?,@?) `, [s, m], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log("Gender", results);
                return data(null, results[0]);
            });
        } catch (e) {
            console.error("Error in GetGenderType:", e);
            return callBack(e);
        }
    },
    GetAddressType: (data, callBack) => {
        try {
            var s, m;
            pool.query(`call GetAllAddressType(@?,@?) `, [s, m], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log("Address", results);
                return data(null, results);
            });
        } catch (e) {
            console.error("Error in GetUserType:", e);
            return callBack(e);
        }
    },
    GetDays: (data, callBack) => {
        try {
            var s, m;
            pool.query(`call GetAllDays(@?,@?) `, [s, m], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log("Days", results);
                return data(null, results);
            });
        } catch (e) {
            console.error("Error in GetUserType:", e);
            return callBack(e);
        }
    },
    GetStatus: (data, callBack) => {
        try {
            var s, m;
            pool.query(`call GetAllAccountType(@?,@?) `, [s, m], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log("Status", results);
                return data(null, results);
            });
        } catch (e) {
            console.error("Error in GetUserType:", e);
            return callBack(e);
        }
    },

    // GetAccountType: (data, callBack) => { 
    //     try {
    //         var s, m;
    //         pool.query(`call GetAllAccountType(@?,@?) `, [s, m], (error, results, fields) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             console.log("list", results);
    //             return callBack(null, results);
    //         });
    //     } catch (e) {
    //         console.error("Error in GetUserType:", e);
    //         return callBack(e);
    //     }

    // }
}

