
// workout model
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('workout', {
        name: { type: DataTypes.STRING },
        date: { type: DataTypes.DATEONLY },
    });
}
