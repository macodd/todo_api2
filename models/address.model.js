
// user model for db
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("address", {
        street : Sequelize.STRING,
        city : Sequelize.STRING,
        state : Sequelize.STRING,
        country : Sequelize.STRING,
        zipcode : Sequelize.STRING,
    });
};