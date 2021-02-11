module.exports = (sequelize, Sequelize) => {
    return sequelize.define('todoListItem', {
        todo: Sequelize.TEXT,
        done: Sequelize.BOOLEAN
    });
};
