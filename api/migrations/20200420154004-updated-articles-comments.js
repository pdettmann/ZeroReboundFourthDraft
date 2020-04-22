'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ArticlesComments', 'commentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Comments',
        key: 'id',
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('ArticlesComments', 'commentId');

  }
}


