module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: {
				type: Sequelize.STRING,
				validate: {
					notNull: true,
				},
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
		queryInterface.dropTable('Users')
	),
};
