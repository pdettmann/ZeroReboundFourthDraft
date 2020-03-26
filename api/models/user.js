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
    // associations can be defined here
  };
  return User;
};
