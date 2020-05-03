module.exports = (sequelize, DataTypes) => {
	const ArticleVersion = sequelize.define('ArticleVersion', {
		articleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Articles',
				key: 'id',
				as: 'article',
			},
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
	}, {});

	ArticleVersion.associate = function (models) {
		models.ArticleVersion.belongsTo(models.Article, {
			as: 'article',
			foreignKey: 'articleId',
		});
	};

	return ArticleVersion;
};
