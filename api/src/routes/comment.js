const express = require('express');
const auth = require('../middlewares/auth');
const { User, Comment, ArticlesComments } = require('../../models');
const { getGravatarUrl } = require('../utils')
// const Sequelize = require('sequelize');
const router = express.Router();

router.post('/create', auth.requireUserLogin, (req, res) => {
	const { userId } = req.session;
	const { text, articleId } = req.body;


	Comment.create({
		userId: userId,
		text: text,
	})
	.then((comment) => {
		Comment.findOne({
			where: {
				id: comment.id
			},
			include: [{ model: User, as: 'commenter', attributes: ['email', 'firstName', 'lastName'] }]
		}).then((comment) => {
			ArticlesComments.create({
				articleId: articleId,
				commentId: comment.id,
			}).then(() => {
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
					}
				});
			})
			.catch((error) => {
				console.error(error);
				res.status(400);
				res.send({error: 'Could not create comment'});
			});
		});
	})
	.catch((error) => {
		console.error(error);
		res.status(400);
		res.send({error: 'Could not create comment.'})
	});
});

// router.get('/findByText', auth.requireUserLogin, (req, res) => {
//     const text = req.query.text;

//     if (!text) {
//         res.status(404);
//         return res.send({ error: 'Missing parameters' });
//     }

//     Comment.findAll({
//         where: {
//             text: {
//                 [Sequelize.Op.iLike]: text,
//             },
//         },
//         attributes: ['text'],
//         include: [{ model: User, as: 'commenter', attributes: ['firstName', 'lastName', 'email'] }]
//     })
//     .then((comments) => {
//         if (comments.length === 0) {
//             res.status(404);
//             res.send({
//                 error: 'No comments were found.'
//             });
//         } else {
//             comments.forEach((comment) => {
//                 comment.commenter.dataValues.avatarUrl = getGravatarUrl(comment.commenter.email);
//             });

//             res.send({
//                 comments
//             });
//         }
//     })
//     .catch((err) => {
//         res.status(400);
//         res.send(err);
//     })
// });

router.get('/findByArticleId', auth.requireUserLogin, (req, res) => {
	const articleId = req.query.articleId;
	const userId = req.session.userId;

	if (!articleId) {
		res.status(404);
		return res.send({ error: 'Missing parameters' });
	}

	ArticlesComments.findAll({
		where: {
			articleId: articleId,
		},
		attributes: ['commentId'],
		include: [
			{
				model: Comment,
				as: 'comment',
				attributes: ['id', 'userId', 'text', 'createdAt'],
				include: { model: User, as: 'commenter', attributes: ['email', 'firstName', 'lastName'] }
			}
		]
	})
	.then((articlesComments) => {
		const comments = articlesComments.map((e) => e.comment);

		if (comments.length === 0) {
			res.status(404);
			res.send({
				error: 'No comments were found.'
			});
		} else {
			comments.forEach((comment) => {
				comment.dataValues.avatarUrl = getGravatarUrl(comment.commenter.email);
				delete comment.dataValues.commenter.dataValues.email;
				comment.dataValues.isCommenter = (comment.dataValues.userId === userId);
			});

			res.send({
				comments
			});
		}
	})
	.catch((err) => {
		res.status(400);
		res.send(err);
	})
});

router.delete('/deleteComment', auth.requireUserLogin, (req, res) => {
	const commentId = req.query.commentId;

	// check if the comment belongs to the person first?
	Comment.destroy({
		where: {
			id: commentId,
		}
	})
	.then(() => {
		res.sendStatus(200);
	})
	.catch((error) => {
		res.status(400);
		res.send({ error: 'Something went wrong.' });
	});
});

module.exports = router;
