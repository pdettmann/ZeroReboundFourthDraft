const axios = require('axios');
const app = require('../src/app');
const Jimp = require("jimp")
const looksSame = require('looks-same');
const fs = require('fs');
const imageDownloader = require('image-downloader')

const PORT = 8081;
const client = axios.create({
	baseURL: `http://localhost:${PORT}`,
	withCredentials: true,
});

let server;

beforeAll((done) => {
	server = app.listen(PORT, async () => {
		const data = {
			firstName: 'Padme',
			lastName: 'Amidala',
			email: 'padme@amidala.com',
			password: 'maytheforcebewithyou'
		};

		await client.post('/user/create', data);

		done();
	});
});

afterAll(async () => {
	await server.close();
});

test('creates article', async () => {

	const data = {
		title: 'title',
		text: 'text',
	};

	const result = await client.post('/article/create', data);

	const { article } = result.data;

	expect(article.title).toBe(data.title);
	expect(article.text).toBe(data.text);
});

test('finds article', async () => {
	const data = {
		author: {
			firstName: 'Padme',
			lastName: 'Amidala',
		},
		title: 'title',
		text: 'text',
	};

	const result = await client.get(`/article/find?title=${data.title}`);

	const { articles } = result.data;
	const article = articles[0];

	expect(article.title).toBe(data.title);
	expect(article.text).toBe(data.text);
	expect(article.author.firstName).toBe(data.author.firstName);
	expect(article.author.lastName).toBe(data.author.lastName);

});

test('uploads image', async (done) => {
	jest.setTimeout(10000);

	const imagePath = `${__dirname}/../static/meme.png`;

	const formData = new FormData();
	const blob = new Blob([fs.readFileSync(imagePath)], { type: 'image/jpeg' });
	formData.append('imageFile', blob);

	const result = await client.post('/article/imageupload', formData, {
		headers : {
			'Content-Type' : 'multipart/form-data',
		},
	});

	const { imageUrl } = result.data

	const options = {
		url: imageUrl,
		dest: `${__dirname}/../static`,
	}

	const { filename } = await imageDownloader.image(options);

	looksSame(filename, imagePath, (_, { equal }) => {
		expect(equal).toBe(true);
		done();
	});

	// need to test if the image is exactly the same

	fs.unlinkSync(filename);
})
