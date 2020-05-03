module.exports = (sequelize, DataTypes) => {
	const Article = sequelize.define('Article', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: true,
			},
		},
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

	Article.associate = function (models) {
		models.Article.belongsTo(models.User, {
			as: 'author',
			foreignKey: 'userId',
		});
		models.Article.hasMany(models.ArticlesComments, {
			as: 'articles',
			foreignKey: 'articleId',
			onDelete: 'cascade',
			hooks: true,
		});
		models.Article.hasMany(models.ArticleVersion, {
			foreignKey: 'articleId',
			onDelete: 'cascade',
			hooks: true,
		});
	};
	return Article;
};
