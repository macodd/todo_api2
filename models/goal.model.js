
// user model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("goal", {
        currentWeight : { type: DataTypes.DOUBLE },
        goalWeight : { type: DataTypes.DOUBLE },
        height : { type: DataTypes.DOUBLE },
        goalType : { type: DataTypes.STRING },
    });
};