module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface
			.addColumn('Comments', 'userId', {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
					as: 'author',
				},
				onDelete: 'CASCADE',
			})
			.then(() => (
				queryInterface
					.addColumn('Comments', 'text', {
						type: Sequelize.TEXT,
						validate: {
							notNull: true,
						},
					})
			))
	),

	down: (queryInterface) => (
		queryInterface.removeColumn('Comments', 'userId')
			.then(() => (
				queryInterface.removeColumn('Comments', 'text')
			))
	),
};
