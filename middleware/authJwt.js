// json web token encryption library
const jwt = require('jsonwebtoken');
// secret key
const config = require('../config/auth.config');

// checks to see if token is provided
verifyToken = function (req, res, next) {
    // get token from headers
    let token = req.headers["x-access-token"];

    if(!token) {
        // 403 : Forbidden
        return res.status(403).json({
            "message" : "No token provided"
        });
    }

    jwt.verify(token, config.secretAuthKey, function (err, decoded) {
        if (err) {
            // 401 : Unauthorized
            return res.status(401).json({
                "message" : "Unauthorized"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

const authJwt = {
    verifyToken: verifyToken,
}

module.exports = authJwt;