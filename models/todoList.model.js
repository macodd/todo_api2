module.exports = (sequelize, Sequelize) => {
    return sequelize.define('todoList', {
        name: Sequelize.STRING
    });
}
