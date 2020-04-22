'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CommentVersions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentId: {
        primaryKey: true,
        references: {
          model:'Comments',
          key:'id',
        },
        type: Sequelize.INTEGER
      },
      text: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      createdAt: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CommentVersions');
  }
};
