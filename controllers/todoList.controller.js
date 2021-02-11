// database models
const db = require("../models");

const TodoList = db.todoList;

// returns all the todoLists for a specific user
exports.getTodos = function (req, res) {
    TodoList.findAll({
        where: {
            userId: req.params.userId
        }
    })
    .then((todosList) => {
        res.status(200).json(todosList);
    });
};

// returns a specific todoList for a specific user
exports.getTodoByID = function (req, res) {
    TodoList.findOne({ where: {
            userId: req.params.userId,
            id: req.params.id
        }, include: db.todoListItem
    })
    .then((todoList) => {
        res.status(200).json(todoList);
    });
};

// Creates a new todoList in the database
exports.createTodoList = function (req, res) {
    TodoList.create({
        name: req.body.name,
        userId: req.params.userId
    })
    .then((todo) => res.status(200).json(todo));
};

// Deletes a existing todoList from the database
exports.deleteTodoListByID = function (req, res) {
    TodoList.findOne({
        where: {
            userId: req.params.userId,
                id: req.params.id
        }
    })
    .then((todoList) => {
        if (todoList == null) {
            res.status(404).json({"message": "Not Found"});
        }
        else {
            todoList.destroy().then(() => {
                res.status(200).json({"message" : `item ${req.params.id} deleted`})
            });
        }
    });
}