const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');

// export auth header verifier
module.exports = {
    authJwt,
    verifySignUp
}