'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'author'
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
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};
