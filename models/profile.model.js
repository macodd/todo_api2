
// user model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("profile", {
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        dob: { type: DataTypes.DATEONLY },
        gender: { type: DataTypes.STRING },
    });
};