
// user model for db
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("goal", {
        currentWeight : Sequelize.DOUBLE,
        goalWeight : Sequelize.DOUBLE,
        height : Sequelize.INTEGER,
        goalType : Sequelize.STRING
    });
};