'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
        .addColumn('Comments', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
            as: 'author'
          }
        })
      .then(() => {
        return queryInterface
          .addColumn('Comments', 'text', {
            type: Sequelize.STRING,
            validate: {
              notNull: true,
            }
          });
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments', 'userId')
      .then(() => {
        return queryInterface.removeColumn('Comments', 'text');
      });
  }
};
