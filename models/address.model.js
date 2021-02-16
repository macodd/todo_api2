
// user model for db
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("address", {
        street : { type: DataTypes.STRING },
        city : { type: DataTypes.STRING },
        state : { type: DataTypes.STRING },
        country : { type: DataTypes.STRING },
        zipcode : { type: DataTypes.STRING },
    });
};