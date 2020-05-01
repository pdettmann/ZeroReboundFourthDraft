
const requireUserLogin = (req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		res.status(401).send({ error: 'Authentication required.' });
	}
};

module.exports = {
	requireUserLogin,
};
