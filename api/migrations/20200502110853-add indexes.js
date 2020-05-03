module.exports = {
	up: (queryInterface) => (
		queryInterface.addIndex('Users', ['email'])
			.then(() => queryInterface.addIndex('Articles', ['userId', 'title']))
			.then(() => queryInterface.addIndex('Comments', ['userId']))
			.then(() => queryInterface.addIndex('ArticlesComments', ['articleId']))
			.then(() => queryInterface.addIndex('ArticlesComments', ['commentId']))
	),

	down: (queryInterface) => (
		queryInterface.removeIndex('Users', ['email'])
			.then(() => queryInterface.removeIndex('Articles', ['userId', 'title']))
			.then(() => queryInterface.removeIndex('Comments', ['userId']))
			.then(() => queryInterface.removeIndex('ArticlesComments', ['articleId']))
			.then(() => queryInterface.removeIndex('ArticlesComments', ['commentId']))
	),
};
