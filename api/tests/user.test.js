// const axios = require('axios');
// const app = require('../src/app');

// const PORT = 8080;
// const client = axios.create({
// 	baseURL: `http://localhost:${PORT}`,
// 	withCredentials: true,
// });

// let server;

// beforeAll(() => {
// 	server = app.listen(PORT);
// });

// afterAll(() => {
// 	server.close();
// });

// test('creates user', async () => {
// 	const data = {
// 		firstName: 'Obi-Wan',
// 		lastName: 'Kenobi',
// 		email: 'obi@kenobi.com',
// 		password: 'maytheforcebewithyou',
// 	};

// 	const result = await client.post('/user/create', data);

// 	const { user } = result.data;

// 	expect(user.firstName).toBe(data.firstName);
// 	expect(user.lastName).toBe(data.lastName);
// 	expect(user.email).toBe(data.email);

// 	console.error(error);
// });

// test('authenticates user', async () => {
// 	const data = {
// 		firstName: 'Obi-Wan',
// 		lastName: 'Kenobi',
// 		email: 'obi@kenobi.com',
// 		password: 'maytheforcebewithyou',
// 	};

// 	const result = await client.post('/user/auth', {
// 		email: data.email,
// 		password: data.password,
// 	});

// 	const { user } = result.data;

// 	expect(user.firstName).toBe(data.firstName);
// 	expect(user.lastName).toBe(data.lastName);
// 	expect(user.email).toBe(data.email);
// });

// test('fetch user profile', async () => {
// 	const data = {
// 		firstName: 'Obi-Wan',
// 		lastName: 'Kenobi',
// 		email: 'obi@kenobi.com',
// 		gravatarUrl: 'https://www.gravatar.com/avatar/987632e5f40feae61e1f764b163ece4c',
// 	};

// 	const result = await client.get('/user/profile');
// 	const { user } = result.data;

// 	expect(user.firstName).toBe(data.firstName);
// 	expect(user.lastName).toBe(data.lastName);
// 	expect(user.email).toBe(data.email);
// 	expect(user.avatarUrl).toBe(data.gravatarUrl);
// });

const proxyquire = require('proxyquire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { makeMockModels } = require('sequelize-test-helpers')
const sinon = require('sinon');

chai.use(chaiAsPromised);

const expect = chai.expect;

const mockModels = makeMockModels({
	User: {
		findOne: sinon.stub(),
		findAll: sinon.stub(),
		create: sinon.stub(),
		destroy: sinon.stub(),
	},
	Article: {
		findOne: sinon.stub(),
		findAll: sinon.stub(),
		create: sinon.stub(),
		destroy: sinon.stub(),
	},
	Comment: {
		findOne: sinon.stub(),
		findAll: sinon.stub(),
		create: sinon.stub(),
		destroy: sinon.stub(),
	},
	ArticlesComments: {
	  findAll: sinon.stub(),
	  create: sinon.stub(),
	}
});


