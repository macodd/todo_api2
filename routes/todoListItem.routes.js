// controller for todos list database
const controller = require("../controllers/todoListItem.controller");
const authJwt = require("../middleware/authJwt");

// function to return items of a specific todolist
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // get a specific list item
    app.get('/api/user/:userId/todos/:todoListId/item/:id', [authJwt.verifyToken], controller.getTodoListItem);

    // create a specific todoListItem into the specific list id
    app.post('/api/user/:userId/todos/:todoListId/create', [authJwt.verifyToken], controller.createTodoListItem);

    // update data on specific todoListItem
    app.put('/api/user/:userId/todos/:todoListId/item/:id/update', [authJwt.verifyToken], controller.updateTodoListItem);

    // delete todoListItem
    app.delete('/api/user/:userId/todos/:todoListId/item/:id/delete', [authJwt.verifyToken], controller.deleteTodoListItem);
}