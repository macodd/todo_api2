
// user model for db
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        email: Sequelize.STRING,
        password: Sequelize.STRING
    });
};