module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface
			.addColumn('Users', 'lastName', {
				type: Sequelize.STRING,
				validate: {
					notNull: true,
				},
			})
			.then(() => (
				queryInterface
					.addColumn('Users', 'email', {
						type: Sequelize.STRING,
						validate: {
							notNull: true,
							isEmail: true,
						},
					})
			))
			.then(() => (
				queryInterface
					.addColumn('Users', 'hashedPassword', {
						type: Sequelize.STRING(128),
						validate: {
							notNull: true,
						},
					})
			))
	),

	down: (queryInterface) => (
		queryInterface
			.removeColumn('Users', 'lastName')
			.then(() => (
				queryInterface.removeColumn('Users', 'email')
			))
			.then(() => (
				queryInterface.removeColumn('Users', 'hashedPassword')
			))
	),
};
