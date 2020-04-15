const crypto = require('crypto');

const getGravatarUrl = (email) => {
    const lowercasedAndTrimmedEmail = email.trim().toLowerCase();
    const md5Hash = crypto.createHash('md5').update(lowercasedAndTrimmedEmail).digest('hex');
    return `https://www.gravatar.com/avatar/${md5Hash}`;
};

module.exports = {
    getGravatarUrl,
};
