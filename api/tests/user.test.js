const axios = require('axios');
const app = require('../src/app');

const PORT = 8080;
const client = axios.create({
    baseURL: `http://localhost:${PORT}`,
    withCredentials: true,
});

let server;

beforeAll(() => {
    server = app.listen(PORT);
});

afterAll(() => {
    server.close();
});

test('creates user', async () => {

    const data = {
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        email: 'obi@kenobi.com',
        password: 'maytheforcebewithyou'
    };

    const result = await client.post('/user/create', data);

    const { user } = result.data;

    expect(user.firstName).toBe(data.firstName);
    expect(user.lastName).toBe(data.lastName);
    expect(user.email).toBe(data.email);

});

test('authenticates user', async () => {

    const data = {
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        email: 'obi@kenobi.com',
        password: 'maytheforcebewithyou'
    };

    const result = await client.post('/user/auth', {
        email: data.email,
        password: data.password,
    });

    const { user } = result.data;

    expect(user.firstName).toBe(data.firstName);
    expect(user.lastName).toBe(data.lastName);
    expect(user.email).toBe(data.email);

});

test('fetch user profile', async () => {
    const data = {
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        email: 'obi@kenobi.com',
        gravatarUrl: 'https://www.gravatar.com/avatar/987632e5f40feae61e1f764b163ece4c'
    };

    const result = await client.get('/user/profile');
    const { user } = result.data;

    expect(user.firstName).toBe(data.firstName);
    expect(user.lastName).toBe(data.lastName);
    expect(user.email).toBe(data.email);
    expect(user.avatarUrl).toBe(data.gravatarUrl);

});
