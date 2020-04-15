
const requireUserLogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.send({ error: 'Authentication required.' });
    }
};

module.exports = {
    requireUserLogin,
};
