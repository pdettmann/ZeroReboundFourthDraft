const express = require('express');
const crypto = require('crypto');
const auth = require('../middlewares/auth');
const { User, Article } = require('../../models');
const { getGravatarUrl } = require('../utils');

const router = express.Router();

router.post('/create', async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password,
	} = req.body;

	const hash = crypto.createHash('sha512');
	const data = hash.update(password, 'utf-8');
	const hashedPassword = data.digest('hex');

	try {
		const currentUser = await User.findOne({ where: { email } });

		if (currentUser) {
			return res.status(405).send({ error: 'User already exists.' });
		}

		const user = await User.create({
			firstName,
			lastName,
			email,
			hashedPassword,
		});

		req.session.userId = user.id;
		res.send({
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
	} catch {
		res.send({
			error: 'Internal server error',
		});
	}
});

router.post('/auth', async (req, res) => {
	const { email } = req.body;
	const { password } = req.body;

	try{
		const user = await User.findOne({ where: { email } });

		if (user === null) {
			return res.status(404).send({ error: 'Invalid login.' });
		}

		const hash = crypto.createHash('sha512');
		const data = hash.update(password, 'utf-8');
		const hashedPassword = data.digest('hex');

		if (user.hashedPassword !== hashedPassword) {
			return res.status(401).send({ error: 'Invalid login.' });
		}

		user.dataValues.avatarUrl = getGravatarUrl(user.email);
		req.session.userId = user.id;
		res.send({
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(400).send({ error: 'Internal server error' });
	}
});

router.get('/profile', auth.requireUserLogin, async (req, res) => {
	const { userId } = req.session;

	try {
		const user = await User.findOne({
			where: {
				id: userId,
			},
			attributes: ['firstName', 'lastName', 'email'],
		});

		if (!user) {
			return res.status(404).send({ error: 'No user was found.' });
		}

		user.dataValues.avatarUrl = getGravatarUrl(user.email);
		res.send({ user });

	} catch {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.get('/articles', auth.requireUserLogin, async (req, res) => {
	const { userId } = req.session;

	try {
		const articles = await Article.findAll({
			where: { userId },
			attributes: ['id', 'title', 'text'],
			include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }],
		});

		if (articles.length == 0) {
			return res.send('No articles were found.');
		}

		res.send({ articles });
	} catch {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.delete('/logout', auth.requireUserLogin, (req, res) => {
	req.session.destroy();
	res.sendStatus(200);
});

router.delete('/deleteUser', auth.requireUserLogin, async (req, res) => {
	const { userId } = req.session;

	try{
		await User.destroy({ where: { id: userId } })
		req.session.destroy();
		res.sendStatus(200);
	} catch {
		res.status(400).send({ error });
	}
});

module.exports = router;
