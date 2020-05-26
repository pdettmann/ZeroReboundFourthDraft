const axios = require('axios');
const app = require('../src/app');

const PORT = 8080;
const client = axios.create({
	baseURL: `http://localhost:${PORT}`,
	withCredentials: true,
});

let server;

beforeAll((done) => {
	server = app.listen(PORT);
	done();
});

afterAll((done) => {
	server.close();
	done();
});

test('creates user', async (done) => {
	const userData = {
		firstName: 'Obi-Wan',
		lastName: 'Kenobi',
		email: 'obi@kenobi.com',
		password: 'maytheforcebewithyou',
	};

	const result = await client.post('/user/create', userData);

	const { user } = result.data;

	expect(user.firstName).toBe(userData.firstName);
	expect(user.lastName).toBe(userData.lastName);
	expect(user.email).toBe(userData.email);

	done();
});

test('authenticates user', async (done) => {
	const userData = {
		firstName: 'Obi-Wan',
		lastName: 'Kenobi',
		email: 'obi@kenobi.com',
		password: 'maytheforcebewithyou',
	};

	const result = await client.post('/user/auth', {
		email: userData.email,
		password: userData.password,
	});

	const { user } = result.data;

	expect(user.firstName).toBe(userData.firstName);
	expect(user.lastName).toBe(userData.lastName);
	expect(user.email).toBe(userData.email);

	done();
});

test('gets user profile', async (done) => {
	const userData = {
		firstName: 'Obi-Wan',
		lastName: 'Kenobi',
		email: 'obi@kenobi.com',
		gravatarUrl: 'https://www.gravatar.com/avatar/987632e5f40feae61e1f764b163ece4c',
	};

	const result = await client.get('/user/profile');
	const { user } = result.data;

	expect(user.firstName).toBe(userData.firstName);
	expect(user.lastName).toBe(userData.lastName);
	expect(user.email).toBe(userData.email);
	expect(user.avatarUrl).toBe(userData.gravatarUrl);

	done();
});

test('get user articles without articles', async (done) => {
	const result = await client.get('/user/articles');

	expect(result.data).toBe('No articles were found.');

	done();
});

test('gets user articles', async (done) => {
	const articleData = {
		title: 'title',
		text: 'text',
	};

	await client.post('/article/create', articleData);

	const result = await client.get('/user/articles');

	const { articles } = result.data;
	const article = articles[0];

	expect(article.title).toBe('title');
	expect(article.text).toBe('text');
	expect(article.author.firstName).toBe('Obi-Wan');
	expect(article.author.lastName).toBe('Kenobi');

	done();
});

test('logout user', async (done) => {
	const result = await client.delete('/user/logout');

	expect(result.data).toBe('OK');

	done();
});

test('delete user', async (done) => {
	const userData = {
		email: 'obi@kenobi.com',
		password: 'maytheforcebewithyou',
	};

	await client.post('/user/auth', {
		email: userData.email,
		password: userData.password,
	});

	const result = await client.delete('/user/deleteUser');

	expect(result.data).toBe('OK');

	done();
});
