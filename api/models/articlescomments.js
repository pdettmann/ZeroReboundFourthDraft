'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticlesComments = sequelize.define('ArticlesComments', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id',
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Comments',
        key: 'id',
      }
    }
  }, {});

  ArticlesComments.associate = function(models) {
    models.ArticlesComments.belongsTo(models.Comment, { foreignKey: 'commentId' });
    models.ArticlesComments.belongsTo(models.Article, { foreignKey: 'articleId' })
  };
  return ArticlesComments;
};
