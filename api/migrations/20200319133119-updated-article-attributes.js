module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface
			.addColumn('Articles', 'title', {
				type: Sequelize.STRING,
				validate: {
					notNull: true,
				},
			})
			.then(() => (
				queryInterface
					.addColumn('Articles', 'userId', {
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'Users',
							key: 'id',
							as: 'author',
						},
						onDelete: 'CASCADE',
					})
			))
			.then(() => (
				queryInterface
					.addColumn('Articles', 'text', {
						type: Sequelize.TEXT,
						validate: {
							notNull: true,
						},
					})
			))
	),

	down: (queryInterface) => (
		queryInterface
			.removeColumn('Articles', 'title')
			.then(() => (
				queryInterface.removeColumn('Articles', 'userId')
			))
			.then(() => (
				queryInterface.removeColumn('Articles', 'text')
			))
	),
};
