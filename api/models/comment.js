module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id',
				as: 'author',
			},
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: true,
			},
		},
	}, {});

	Comment.associate = function (models) {
		models.Comment.belongsTo(models.User, {
			as: 'commenter',
			foreignKey: 'userId',
		});
		models.Comment.hasMany(models.ArticlesComments, {
			as: 'comments',
			foreignKey: 'commentId',
			onDelete: 'cascade',
			hooks: true,
		});
		models.Comment.hasMany(models.CommentVersion, {
			as: 'commentVersion',
			foreignKey: 'commentId',
			onDelete: 'cascade',
			hooks: true,
		});
	};

	return Comment;
};
