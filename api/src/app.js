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

let origin = 'http://localhost:3000';

if (process.env.NODE_ENV === 'test') {
	origin = 'http://localhost';
} else if (process.env.ZR_PRODUCTION === 'true') {
	origin = 'https://zerorebound.com';
}

app.use(cors({
	origin,
	credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	store: process.env.NODE_ENV === 'test' ? new session.MemoryStore() : new PgSession({ pool: pgPool }),
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
