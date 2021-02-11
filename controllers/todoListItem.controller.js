// database models
const db = require("../models");

const TodoListItem = db.todoListItem;

// get a specific list item
exports.getTodoListItem = function (req, res) {
    TodoListItem.findOne({
        where: {
            todoListId: req.params.todoListId,
            id: req.params.id
        }
    })
    .then((todoListItem) => {

        console.log(todoListItem);

        if (todoListItem == null) {
            res.status(404).json({"error" : "Not Found" });
        } else {
            res.status(200).json(todoListItem);
        }
    });
};

// create a specific todoListItem into the specific list id
exports.createTodoListItem = function (req, res) {
    db.todoList.findOne({
        where: {
            userId: req.params.userId,
            id: req.params.todoListId
        }
    })
    .then((todoList) => {
        if (todoList == null) {
            res.status(404).json({"error": "Not Found"});
        } else {
            TodoListItem.create({
                todo: req.body.todo,
                done: req.body.done,
                todoListId: todoList.id
            })
            .then((todoItem) => res.status(200).json(todoItem));
        }
    });
};

// update data on specific todoListItem
exports.updateTodoListItem = function(req, res) {
    TodoListItem.findOne({
        where: {
            todoListId: req.params.todoListId,
            id: req.params.id
        }
    })
    .then((todoListItem) => {

        console.log(todoListItem);

        if (todoListItem == null) {
            res.status(404).json({"error": "Not Found"});
        } else {
            todoListItem.update({
                done: req.body.done
            })
            .then((todoListItem) => res.status(200).json(todoListItem));
        }
    });
};

// delete a specific todoListItem
exports.deleteTodoListItem = function (req, res) {
    TodoListItem.findOne({
        where: {
            todoListId: req.params.todoListId,
            id: req.params.id
        }
    })
    .then((todoListItem) => {

        console.log(todoListItem);

        if (todoListItem == null) {
            res.status(404).json({"error": "Not Found"});
        } else {
            todoListItem.destroy().then(() => {
                res.status(200).json({
                    "message": `item ${req.params.id} from list ${req.params.todoListId} was deleted`
                })
            });
        }
    });
};