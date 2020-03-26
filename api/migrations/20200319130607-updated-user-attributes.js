'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'lastName', {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      })
      .then(() => {
        return queryInterface
          .addColumn('Users', 'email', {
            type: Sequelize.STRING,
            validate: {
              notNull: true,
              isEmail: true,
            }
          });
      })
      .then(() => {
        return queryInterface
          .addColumn('Users', 'hashedPassword', {
            type: Sequelize.STRING(128),
            validate: {
              notNull: true,
            }
          });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'lastName')
      .then(() => {
        return queryInterface.removeColumn('Users', 'email');
      })
      .then(() => {
        return queryInterface.removeColumn('Users', 'hashedPassword');
      });
  }
};
