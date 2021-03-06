module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface
			.createTable('CommentVersions', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				commentId: {
					primaryKey: true,
					references: {
						model: 'Comments',
						key: 'id',
					},
					onDelete: 'CASCADE',
					type: Sequelize.INTEGER,
				},
				text: {
					primaryKey: true,
					type: Sequelize.STRING,
				},
				createdAt: {
					primaryKey: true,
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
		queryInterface.dropTable('CommentVersions')
	),
};
