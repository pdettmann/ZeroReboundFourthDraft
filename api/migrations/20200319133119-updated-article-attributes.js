'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Articles', 'title', {
      type: Sequelize.STRING,
      validate: {
        notNull: true,
      }
    })
    .then(() => {
      return queryInterface
        .addColumn('Articles', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
            as: 'author'
          }
        });
    })
    .then(() => {
      return queryInterface
        .addColumn('Articles', 'text', {
          type: Sequelize.TEXT,
          validate: {
            notNull: true,
          }
        });
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Articles', 'title')
      .then(() => {
        return queryInterface.removeColumn('Articles', 'userId');
      })
      .then(() => {
        return queryInterface.removeColumn('Articles', 'text');
      });
  }
};
