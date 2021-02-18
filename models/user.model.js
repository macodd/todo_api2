
// user model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        verified: { type: DataTypes.BOOLEAN }
    });
};