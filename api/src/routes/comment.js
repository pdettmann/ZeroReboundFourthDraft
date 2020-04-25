const express = require('express');
const auth = require('../middlewares/auth');
const { User, Comment, ArticlesComments } = require('../../models');
const { getGravatarUrl } = require('../utils')
const Sequelize = require('sequelize');
const router = express.Router();

router.post('/create', auth.requireUserLogin, (req, res) => {
    const { userId } = req.session;
    const { text, articleId } = req.body;


    Comment.create({
        userId: userId,
        text: text,
    })
    .then((comment) => {
        ArticlesComments.create({
            articleId: articleId,
            commentId: comment.id,
        }).then(() => {
            res.send({
                comment: {
                    text: comment.text
                }
            });
        })
        .catch((error) => {
            console.error(error)
        });
    })
    .catch((error) => {
        console.error(error);

        res.send({
            error: 'Could not create comment.'
        })
    });
});

router.get('/findByText', auth.requireUserLogin, (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.send({ error: 'Missing parameters' });
    }

    Comment.findAll({
        where: {
            text: {
                [Sequelize.Op.iLike]: text,
            },
        },
        attributes: ['text'],
        include: [{ model: User, as: 'commenter', attributes: ['firstName', 'lastName', 'email'] }]
    })
    .then((comments) => {
        if (comments.length === 0) {
            res.send({
                error: 'No comments were found.'
            });
        } else {
            comments.forEach((comment) => {
                comment.commenter.dataValues.avatarUrl = getGravatarUrl(comment.commenter.email);
            });

            res.send({
                comments
            });
        }
    })

});

router.get('/findByArticleId', auth.requireUserLogin, (req, res) => {
    const articleId = req.query.articleId;

    if (!articleId) {
        return res.send({ error: 'Missing parameters' });
    }

    ArticlesComments.findAll({
        where: {
            articleId: articleId,
        },
        attributes: ['commentId'],
        include: [{ model: Comment, attributes: ['userId', 'text', 'createdAt'] }]
    })
    .then((comments) => {
        if (comments.length === 0) {
            res.send({
                error: 'No comments were found.'
            });
        } else {
            comments.forEach((comment) => {
                // comment.dataValues.avatarUrl = getGravatarUrl(comment.commenter.email);
            });

            res.send({
                comments
            });
        }
    })


        //     for each commentId in commentIds;
        //     Comment.findOne(
        //     where{
        //         commentId: commentId,
        //     }
        // append to comments????
        // .then((comments))
        // res.send(comments)
        // )

});

module.exports = router;
