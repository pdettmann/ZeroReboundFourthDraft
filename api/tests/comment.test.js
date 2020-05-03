const axios = require('axios');
const app = require('../src/app');

const PORT = 8082;
const client = axios.create({
	baseURL: `http://localhost:${PORT}`,
	withCredentials: true,
});

let server;

beforeAll(async () => {
	server = app.listen(PORT);

	const data = {
		firstName: 'Anakin',
		lastName: 'Skywalker',
		email: 'anakin@skywalker.com',
		password: 'maytheforcebewithyou',
	};

	await client.post('/user/create', data);
});

afterAll(() => {
	server.close();
});

test('creates comment', async () => {
	const data = {
		text: 'comment',
	};

	const result = await client.post('/comment/create', data);

	const { comment } = result.data;

	expect(comment.text).toBe(data.text);
});

// test('finds comment', async () => {
// 	const data = {
// 		commenter: {
// 			firstName: 'Anakin',
// 			lastName: 'Skywalker',
// 		},
// 		text: 'comment',
// 	};

// 	const result = await client.get(`/comment/find?text=${data.text}`);

// 	const { comments } = result.data;
// 	const comment = comments[0];

// 	expect(comment.text).toBe(data.text);
// 	expect(comment.commenter.firstName).toBe(data.commenter.firstName);
// 	expect(comment.commenter.lastName).toBe(data.commenter.lastName);
// 	expect(comment.avatarUrl).toBe(data.avatarUrl);
// });
