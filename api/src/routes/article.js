const express = require('express');
const { User, Article } = require('../../models');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/home', (req, res) => {
	Article.findAll({
		limit: 3,
		order: [['createdAt', 'DESC']],
		attributes: ['id', 'title', 'text', 'createdAt'],
		include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }],
	})
		.then((articles) => {
			if (!articles) {
				res.status(404);
				res.send({
					error: 'No articles',
				});
			} else {
				res.send({ articles });
			}
		})
		.catch((err) => {
			res.status(400);
			res.send(err);
		});
});

// make into async await!
router.post('/create', auth.requireUserLogin, (req, res) => {
	const { title, text } = req.body;
	const { userId } = req.session;

	Article.create({
		title,
		userId,
		text,
	})
		.then((article) => {
			res.send({
				article: {
					title: article.title,
					text: article.text,
				},
			});
		})
		.catch((error) => {
			res.status(400);
			res.send({ error });
		});
});

router.get('/', (req, res) => {
	const { articleId } = req.query;

	if (!articleId) {
		res.status(404);
		return res.send({ error: 'Missing parameters' });
	}

	return Article.findOne({
		where: {
			id: articleId,
		},
		attributes: ['id', 'title', 'text'],
		include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }],
	})
		.then((article) => {
			if (!article) {
				res.status(404);
				res.send({
					error: 'No article was found.',
				});
			} else {
				res.send({ article });
			}
		})
		.catch((error) => {
			res.status(400);
			res.send(error);
		});
});

router.delete('/deleteArticle', auth.requireUserLogin, (req, res) => {
	const { articleId } = req.query;

	Article.destroy({
		where: {
			id: articleId,
		},
	})
		.then(() => {
			res.sendStatus(200);
		})
		.catch((error) => {
			res.status(400);
			res.send({ error });
		});
});


module.exports = router;
