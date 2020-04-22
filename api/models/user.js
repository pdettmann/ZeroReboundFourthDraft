'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isEmail: true,
      }
    },
    hashedPassword: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
  }, {});

  User.associate = function(models) {
    models.User.hasMany(models.Article, { as: 'articles', foreignKey: 'userId' });
    models.User.hasMany(models.Comment, { as: 'comments', foreignKey: 'userId' });
    models.User.hasMany(models.UserVersion, {foreignKey: 'userId' });
  };

  return User;
};
