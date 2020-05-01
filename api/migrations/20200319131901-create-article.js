module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface.createTable('Articles', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
		queryInterface.dropTable('Articles')
	),
};
