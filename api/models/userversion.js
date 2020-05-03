module.exports = (sequelize, DataTypes) => {
	const UserVersion = sequelize.define('UserVersion', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Users',
				key: 'id',
			},
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true,
		},
		hashedPassword: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true,
		},
	}, {});

	UserVersion.associate = function (models) {
		models.UserVersion.belongsTo(models.User, {
			foreignKey: 'userId',
		});
	};

	return UserVersion;
};
