module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface.createTable('ArticlesComments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			articleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Articles',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	),

	down: (queryInterface) => (
		queryInterface.dropTable('ArticlesComments')
	),
};
