
// user model for db
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        dob: Sequelize.DATEONLY,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        gender: Sequelize.STRING,
    });
};