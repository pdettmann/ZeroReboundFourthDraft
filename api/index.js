const app = require('./src/app.js');
const dbConfig = require('../config/database');

const PORT = process.env.ZR_PRODUCTION === 'true' ? 80 : 8080;

app.listen(PORT, () => {
});
