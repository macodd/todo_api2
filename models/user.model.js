
// user model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        dob: { type: DataTypes.DATEONLY },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        gender: { type: DataTypes.STRING },
    });
};