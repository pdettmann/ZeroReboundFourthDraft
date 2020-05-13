const axios = require('axios');
const app = require('../src/app');

const PORT = 8082;
const client = axios.create({
	baseURL: `http://localhost:${PORT}`,
	withCredentials: true,
});

const createArticle = async (done) => {
    const articleData = {
		title: 'title',
		text: 'text',
    };

    await client.post('/article/create', articleData);

    done();
}

const createUser = async (done) => {
    const userData = {
        firstName: 'Anakin',
        lastName: 'Skywalker',
        email: 'anakin@skywalker.com',
        password: 'maytheforcebewithyou',
    };

    await client.post('/user/create', userData);

    createArticle(done);

    done();
};

let server;

beforeAll( (done) => {
    server = app.listen(PORT);
    createUser(done);
    // createArticle(done);
});

afterAll( (done) => {
    server.close();
    done();
});

test('creates comment', async (done) => {
	const commentData = {
        text: 'comment',
        articleId: '1',
        avatarUrl: 'https://www.gravatar.com/avatar/bc5752c2871af0466f7e2054f10d7326',
        commenter: {
			firstName: 'Anakin',
			lastName: 'Skywalker',
		},
	};

	const result = await client.post('/comment/create', {
        text: commentData.text,
        articleId: commentData.articleId,
    });

	const { comment } = result.data;

    expect(comment.text).toBe(commentData.text);
    expect(comment.isCommenter).toBe(true);
    expect(comment.avatarUrl).toBe(commentData.avatarUrl);
    expect(comment.commenter.firstName).toBe(commentData.commenter.firstName);
    expect(comment.commenter.lastName).toBe(commentData.commenter.lastName)

    done();
});

test('finds first comment on a specific article', async (done) => {
	const commentData = {
        text: 'comment',
        articleId: '1',
        avatarUrl: 'https://www.gravatar.com/avatar/bc5752c2871af0466f7e2054f10d7326',
        commenter: {
			firstName: 'Anakin',
			lastName: 'Skywalker',
		},
	};

	const result = await client.get(`/comment/findByArticleId?articleId=${commentData.articleId}`);

	const { comments } = result.data;
	const comment = comments[0];

	expect(comment.text).toBe(commentData.text);
	expect(comment.commenter.firstName).toBe(commentData.commenter.firstName);
	expect(comment.commenter.lastName).toBe(commentData.commenter.lastName);
    expect(comment.avatarUrl).toBe(commentData.avatarUrl);

    done();
});

test('delete comment', async (done) => {

    const result = await client.delete(`/comment/deleteComment?commentId=1`)

    expect(result.data).toBe('OK');

    done();
});
