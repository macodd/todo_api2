const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://mcodd:Oakland2021@127.0.0.1:5433/todo');

// database models to be exported
const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    user: require("../models/user.model")(sequelize, DataTypes),
    role: require("../models/role.model")(sequelize, DataTypes),
    address: require("../models/address.model")(sequelize, DataTypes),
    goal: require("../models/goal.model")(sequelize, DataTypes),
    workout: require("./workout.model")(sequelize, DataTypes),
    exercise: require("./exercise.model")(sequelize, DataTypes),
}

// one goal per user
db.user.hasOne(db.goal, {
    onDelete: "CASCADE"
});
db.goal.belongsTo(db.user, {
    foreignKey : "userId"
});

// one address per user
db.user.hasOne(db.address, {
    onDelete: "CASCADE"
});
db.address.belongsTo(db.user, {
    foreignKey : "userId"
});

// one role can be taken by many users
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

// one user can have many roles
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// different roles
db.ROLES = ["user", "trainer", "admin"]

// link todos list to user
db.user.hasMany(db.workout, {
    onDelete: 'CASCADE'
});
db.workout.belongsTo(db.user);

// link models as one to many relation
db.workout.hasMany(db.exercise, {
    onDelete: 'CASCADE'
});
db.exercise.belongsTo(db.workout);

// export the database
module.exports = db;
