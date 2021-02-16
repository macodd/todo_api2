const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://mcodd:Oakland2021@127.0.0.1:5433/todo');

// database models to be exported
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: require("../models/user.model")(sequelize, Sequelize),
    role: require("../models/role.model")(sequelize, Sequelize),
    address: require("../models/address.model")(sequelize, Sequelize),
    goal: require("../models/goal.model")(sequelize, Sequelize),
    todoList: require("../models/todoList.model")(sequelize, Sequelize),
    todoListItem: require("../models/todoListItem.model")(sequelize, Sequelize),
}

db.goal.belongsTo(db.user, {
    foreignKey : "userId"
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
db.user.hasMany(db.todoList, {
    onDelete: 'CASCADE'
});
db.todoList.belongsTo(db.user);

// link models as one to many relation
db.todoList.hasMany(db.todoListItem, {
    onDelete: 'CASCADE'
});
db.todoListItem.belongsTo(db.todoList);

// export the database
module.exports = db;
