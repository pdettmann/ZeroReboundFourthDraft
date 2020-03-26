const {
  ZR_DB_USER,
  ZR_DB_PW,
  ZR_DB_NAME,
  ZR_DB_HOST,
} = process.env;

module.exports = {
  username: ZR_DB_USER,
  password: ZR_DB_PW,
  database: ZR_DB_NAME,
  host: ZR_DB_HOST,
  dialect: 'postgres',
};
