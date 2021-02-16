
// exercise model
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercise', {
        name: { type: DataTypes.STRING },
        targetWeight : { type: DataTypes.DOUBLE },
        done: { type: DataTypes.BOOLEAN },
    });
};
