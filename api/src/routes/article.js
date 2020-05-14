const express = require('express');
const { User, Article } = require('../../models');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/home', async (req, res) => {
	try {
		const articles = await Article.findAll({
			limit: 3,
			order: [['createdAt', 'DESC']],
			attributes: ['id', 'title', 'text', 'createdAt'],
			include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }],
		});

		if (articles.length == 0) {
			return res.status(404).send({ error: 'No articles' });
		}

		res.send({ articles })
	} catch {
		res.status(400).send({ error: 'Internal server error' });
	}
});

router.post('/create', auth.requireUserLogin, async (req, res) => {
	const { title, text } = req.body;
	const { userId } = req.session;

	try{
		const article = await Article.create({
			title,
			userId,
			text,
		})

		res.send({
			article: {
				title: article.title,
				text: article.text,
				id: article.id,
			},
		});

	} catch {
		res.status(400).send({ error: 'Internal server error' });
	}
});

router.get('/', async (req, res) => {
	const { articleId } = req.query;

	try{
		if (!articleId) {
			return res.status(404).send({ error: 'Missing parameters' });
		}

		const article = await Article.findOne({
			where: {
				id: articleId,
			},
			attributes: ['id', 'title', 'text'],
			include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }],
		})

		if (!article) {
			return res.status(404).send({ error: 'No article was found.' });
		}

		res.send({ article });

	} catch {
		res.status(400).send({ error: 'Internal server error' });
	}
});

router.delete('/deleteArticle', auth.requireUserLogin, async (req, res) => {
	const { articleId } = req.query;

	try {
		await Article.destroy({ where: { id: articleId } })

		res.sendStatus(200);
	} catch {
		res.status(400).send({ error: 'Internal server error' });
	}
});


module.exports = router;
