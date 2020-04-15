'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'author',
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
      }
    }
  }, {});

  Comment.associate = function(models) {
    models.Comment.belongsTo(models.User, { as: 'commenter', foreignKey: 'userId' })
  };

  return Comment;
};
