
// roles to be assigned to users
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("roles", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING
        }
    })
}