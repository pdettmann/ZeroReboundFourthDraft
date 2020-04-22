'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserVersions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        references: {
          model:'Users',
          key:'id',
        },
        type: Sequelize.INTEGER
      },
      firstName: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      lastName: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      email: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      hashedPassword: {
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
    return queryInterface.dropTable('UserVersions');
  }
};
