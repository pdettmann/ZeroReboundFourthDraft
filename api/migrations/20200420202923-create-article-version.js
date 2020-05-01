'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('ArticleVersions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			articleId: {
				primaryKey: true,
				references: {
					model:'Articles',
					key:'id',
				},
				onDelete: 'CASCADE',
				type: Sequelize.INTEGER
			},
			title: {
				primaryKey: true,
				type: Sequelize.STRING
			},
			text: {
				primaryKey: true,
				type: Sequelize.STRING
			},
			createdAt: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('ArticleVersions');
	}
};
