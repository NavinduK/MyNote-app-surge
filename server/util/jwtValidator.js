const jwt = require('jsonwebtoken');
const config = require('./config');

const validate = (token) => {
    // decode token
    if (token) {
        return jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return { status: 400, message: 'INVALID_TOKEN' };
            } else {
                return { status: 200, data: decoded };
            }
        });
    } else {
        return { status: 500, message: 'NO_TOKEN' };
    }
}

module.exports = { validate };