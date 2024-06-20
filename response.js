// utils/response.js

function success(res, data) {
    return res.status(200).json(data);
}

function error(res, status, message) {
    return res.status(status).json({ error: message });
}

module.exports = {
    success,
    error
};
