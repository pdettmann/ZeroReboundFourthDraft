const express = require('express');
const auth = require('../middlewares/auth');
const { User, Comment, ArticlesComments } = require('../../models');
const { getGravatarUrl } = require('../utils');
const Sequelize = require('sequelize');
const router = express.Router();

router.post('/create', auth.requireUserLogin, async (req, res) => {
	const { userId } = req.session;
	const { text, articleId } = req.body;

	try {
		const createComment = await Comment.create({ userId, text });

		const comment = await Comment.findOne({
			where: {
				id: createComment.id,
			},
			include: [{ model: User, as: 'commenter', attributes: ['email', 'firstName', 'lastName'] }],
		});

		await ArticlesComments.create({ articleId, commentId: comment.id })

		res.send({
			comment: {
				id: comment.id,
				createdAt: comment.createdAt,
				text: comment.text,
				isCommenter: true,
				avatarUrl: getGravatarUrl(comment.commenter.email),
				commenter: {
					firstName: comment.commenter.firstName,
					lastName: comment.commenter.lastName,
				},
			},
		});


	} catch {
		res.status(404).send({ error: 'Internal server error' });
	}
});

router.get('/findByArticleId', auth.requireUserLogin, async (req, res) => {
	const { articleId } = req.query;
	const { userId } = req.session;

	try {
		if (!articleId) {
			return res.status(404).send({ error: 'Missing parameters' });
		}

		const articlesComments = await ArticlesComments.findAll({
			where: {
				articleId,
			},
			attributes: ['commentId'],
			include: [
				{
					model: Comment,
					as: 'comment',
					attributes: ['id', 'userId', 'text', 'createdAt'],
					include: { model: User, as: 'commenter', attributes: ['email', 'firstName', 'lastName'] },
				},
			],
		});

		const comments = articlesComments.map((e) => e.comment);

		if (comments.length === 0) {
			return res.status(404).send({ error: 'No comments were found.' });
		}

		await comments.forEach((comment) => {
			comment.dataValues.avatarUrl = getGravatarUrl(comment.commenter.email);
			delete comment.dataValues.commenter.dataValues.email;
			comment.dataValues.isCommenter = (comment.dataValues.userId === userId);
		});

		res.send({ comments });

	} catch {
		res.status(404).send({ error: 'Internal server error' });
	}
});

router.delete('/deleteComment', auth.requireUserLogin, async (req, res) => {
	const { commentId } = req.query;

	try {
		await Comment.destroy({
			where: {
				id: commentId,
			},
		})

		res.sendStatus(200);
	} catch {
		res.status(404).send({ error: 'Comment cannot be deleted' });
	}
});

module.exports = router;
