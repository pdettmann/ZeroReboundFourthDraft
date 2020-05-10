const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pg = require('pg');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dbConfig = require('../config/database');

const pgPool = new pg.Pool({
	host: dbConfig.host,
	user: dbConfig.username,
	password: dbConfig.password,
	database: dbConfig.database,
});

const app = express();

app.use(cors({
	origin: process.env.ZR_PRODUCTION === 'true' ? 'https://zerorebound-d3dd9.web.app' : 'http://localhost:3000',
	credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	store: dbConfig.env === 'test' ? null : new PgSession({ pool: pgPool }),
	secret: process.env.ZR_SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));

app.use(fileUpload({
	useTempFiles: true,
}));

app.use('/user', require('./routes/user'));
app.use('/article', require('./routes/article'));
app.use('/comment', require('./routes/comment'));

module.exports = app;
