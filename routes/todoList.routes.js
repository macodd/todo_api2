// controller for todos list database
const controller = require("../controllers/todoList.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // all todoList
    app.get("/api/user/:userId/todos", [authJwt.verifyToken], controller.getTodos);

    // specific todoList
    app.get("/api/user/:userId/todos/:id", [authJwt.verifyToken], controller.getTodoByID);

    // create a todolist
    app.post("/api/user/:userId/todos/create", [authJwt.verifyToken], controller.createTodoList);

    // delete a specific todoList
    app.delete("/api/user/:userId/todos/:id/delete", [authJwt.verifyToken], controller.deleteTodoListByID);
}