const express = require('express');
const auth = require('../middlewares/auth');
const { User, Article } = require('../../models');
const crypto = require('crypto');
const { getGravatarUrl } = require('../utils')

const router = express.Router();

router.post('/create', (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const hash = crypto.createHash('sha512');
	const data = hash.update(password, 'utf-8');
	const hashedPassword = data.digest('hex');

	User.findOne({
		where: {
			email: email
		}
	}).then((user) => {
		if (user) {
			res.send({
				error: 'User already exists.'
			})
	  } else {
			User.create({
				firstName: firstName,
				lastName: lastName,
				email: email,
				hashedPassword: hashedPassword,
			})
			.then((user) => {
				req.session.userId = user.id;
				res.send({
					user: {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					}
				});
			})
			.catch((error) => {
				console.error(error);

				res.send({
					error: 'Could not create user.'
				})
			});
		}
	})
});

router.post('/auth', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({
		where: {
			email: email
		}
	})
	.then((user) => {
		if (user === null) {
			res.status(404);
			res.send({ error: 'Invalid login.' });
		} else {
			const hash = crypto.createHash('sha512');
			const data = hash.update(password, 'utf-8');
			const hashedPassword = data.digest('hex');

			if (user.hashedPassword !== hashedPassword) {
				res.status(401);
				res.send({ error: 'Invalid login.' });
			} else {
				user.dataValues.avatarUrl = getGravatarUrl(user.email);
				req.session.userId = user.id;
				res.send({
					user: {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					},
				});
			}
		}
	})
	.catch((error) => {
		res.status(400);
		console.error(error);
		res.send({ error: 'Something went wrong.' });
	})
});

router.get('/profile', auth.requireUserLogin, (req, res) => {
	const userId = req.session.userId;

	User.findOne({
		where: {
			id: userId,
		},
		attributes: [ 'firstName', 'lastName', 'email' ]
	})
	.then((user) => {
		if (!user) {
			res.status(404);
			res.send({
				error: 'No user was found.'
			});
		} else {
			user.dataValues.avatarUrl = getGravatarUrl(user.email);

			res.send({
				user
			});
		}
	})
	.catch((error) => {
		res.status(400);
		res.send({ error: 'Something went wrong.' });
	});
});

router.get('/articles', auth.requireUserLogin, (req, res) => {
	const userId = req.session.userId;

	Article.findAll({
		where: {userId},
		attributes: ['id', 'title', 'text'],
		include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }]
	})
	.then((articles) => {
		if (!articles) {
			res.status(404);
			res.send({
				error: 'No articles were found.'
			});
		} else {
			res.send({
				articles
			});
		}
	})
	.catch((error) => {
		res.status(400);
		res.send({ error: 'Something went wrong.' });
	});
});

router.delete('/logout', auth.requireUserLogin, (req, res) => {
	req.session.destroy();
	res.sendStatus(200);
});

router.delete('/deleteUser', auth.requireUserLogin, (req, res) => {
	const userId = req.session.userId;

	User.destroy({
		where: {
			id: userId,
		}
	})
	.then(() => {
		req.session.destroy();
		res.sendStatus(200);
	})
	.catch((error) => {
		res.status(400);
		res.send({ error: 'Something went wrong.' });
	});
});



module.exports = router;
