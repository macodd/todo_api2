const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://mcodd:Oakland2021@127.0.0.1:5433/todo');

// database models to be exported
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: require("../models/user.model")(sequelize, Sequelize),
    todoList: require("../models/todoList.model")(sequelize, Sequelize),
    todoListItem: require("../models/todoListItem.model")(sequelize, Sequelize),
}

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
