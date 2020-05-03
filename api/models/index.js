const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/database.js');

const basename = path.basename(__filename);
const db = {};

// setting up a connection to the database
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// reads every file in models and sets any associations between models, foreign keys, cascades, etc.
fs
	.readdirSync(__dirname)
	.filter((file) => (
		(file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
	))
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
