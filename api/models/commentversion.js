'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentVersion = sequelize.define('CommentVersion', {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model:'Comments',
        key:'id',
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
  }, {});
  CommentVersion.associate = function(models) {
    models.CommentVersion.belongsTo(models.Comment, {foreignKey: 'commentId' });
  }
  return CommentVersion;
};
