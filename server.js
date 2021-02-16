// express module used for starting a server
const express = require("express");
// installed with express used for getting body data
const bodyParser = require('body-parser');
// cross origin library to allow communication between react and express
const cors = require('cors');
// encryption library
var bcrypt = require('bcryptjs');

const db = require("./models");

const Role = db.role;

const app = express();

// sets the Cors library
app.use(cors());
// parses request of type application/json
app.use(bodyParser.json());
// parse request of type application/x-www-form
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/todoList.routes')(app);
require('./routes/todoListItem.routes')(app);
require('./routes/email-invite.route')(app);
require('./routes/new-user.routes')(app);

// sets port and listens for requests
const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// initialize a authenticate db user
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection established');
    })
    .catch(err => {
        console.log('Unable to connect:', err);
    });

// sync user with db
db.sequelize.sync({ force: true }).then(() => {
   console.log('Database & tables created');
   initial();
});

// initializes the roles with their respective ids
function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "trainer"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

// home route
app.get("/", function (req, res) {
   res.json({"message": "Welcome to Todo-api's home page"});
});
