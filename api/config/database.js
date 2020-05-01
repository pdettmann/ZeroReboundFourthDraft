const {
	ZR_DB_USER,
	ZR_DB_PW,
	ZR_DB_NAME,
	ZR_DB_HOST,
	NODE_ENV,
} = process.env;

module.exports = {
	username: ZR_DB_USER,
	password: ZR_DB_PW,
	database: (NODE_ENV === 'test') ? `test-${ZR_DB_NAME}` : ZR_DB_NAME,
	host: ZR_DB_HOST,
	dialect: 'postgres',
	env: NODE_ENV,
};
