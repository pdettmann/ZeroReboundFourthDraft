module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface
			.addColumn('ArticlesComments', 'commentId', {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Comments',
					key: 'id',
				},
				onDelete: 'CASCADE',
			})
	),

	down: (queryInterface) => (
		queryInterface.removeColumn('ArticlesComments', 'commentId')
	),
};
