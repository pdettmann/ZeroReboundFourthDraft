const axios = require('axios');
const app = require('../src/app');

const PORT = 8081;
const client = axios.create({
	baseURL: `http://localhost:${PORT}`,
	withCredentials: true,
});

const createUser = async (done) => {
    const userData = {
        firstName: 'Padme',
        lastName: 'Amidala',
        email: 'padme@amidala.com',
        password: 'maytheforcebewithyou',
    };

    await client.post('/user/create', userData);

    done();
};

let server;

beforeAll( (done) => {
    server = app.listen(PORT)
    createUser(done);
});

afterAll( (done) => {
	server.close();
    done();
});

test('creates article', async (done) => {
    const articleData = {
		title: 'title',
		text: 'text',
	};

	const result = await client.post('/article/create', articleData);

	const { article } = result.data;

	expect(article.title).toBe(articleData.title);
    expect(article.text).toBe(articleData.text);

    done();
});

test('gets home', async (done) => {

	const articleData = {
		title: 'title',
        text: 'text',
        author: {
            firstName: 'Padme',
            lastName: 'Amidala',
        }
	};

	const result = await client.get('/article/home');

	const { articles } = result.data;
	const article = articles[0];

	expect(article.title).toBe(articleData.title);
	expect(article.text).toBe(articleData.text);
	expect(article.author.firstName).toBe(articleData.author.firstName);
    expect(article.author.lastName).toBe(articleData.author.lastName);

    done();
});

test('get article', async (done) => {

	const articleData = {
        id: '1',
		author: {
			firstName: 'Padme',
			lastName: 'Amidala',
		},
		title: 'title',
		text: 'text',
	};

	const result = await client.get(`/article/?articleId=${articleData.id}`);

	const { article } = result.data;

	expect(article.title).toBe(articleData.title);
	expect(article.text).toBe(articleData.text);
	expect(article.author.firstName).toBe(articleData.author.firstName);
    expect(article.author.lastName).toBe(articleData.author.lastName);

    done();
});

test('delete article', async (done) => {

    const result = await client.delete(`/article/deleteArticle?articleId=1`)

    expect(result.data).toBe('OK');

    done();
});

