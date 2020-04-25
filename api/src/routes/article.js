const express = require('express');
const auth = require('../middlewares/auth');
const AWS = require('aws-sdk');
const { User, Article } = require('../../models');
const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4')
const fs = require('fs');
const router = express.Router();


router.post('/create', auth.requireUserLogin, (req, res) => {
    const { title, text } = req.body;
    const { userId } = req.session;

    Article.findOne({
        where: {
            title:title
        }
    }).then((article) => {
        if (article) {
            res.send({
                error: 'Article already exists'
            })
        // return
        }else {
            Article.create({
                title: title,
                userId: userId,
                text: text,
            })
            .then((article) => {
                res.send({
                    article: {
                        title: article.title,
                        text: article.text,
                    }
                });
            })
            .catch((error) => {
                console.error(error);

                res.send({
                    error: 'Could not create article.'
                })
            });
        }
    })

// createArticle(title, text, userId, res) =>

});

router.get('/find', auth.requireUserLogin, (req, res) => {
    const title = req.query.title;
    const userId = req.query.userId;

    if (!userId && !title) {
        return res.send({ error: 'Missing parameters' });
    }

    const whereCondition = {};

    if (title) {
        whereCondition.title = {
            [Sequelize.Op.iLike]: title
        };
    } else if (userId) {
        whereCondition.userId = userId;
    }

    Article.findAll({
        where: whereCondition,
        attributes: ['id','title', 'text'],
        include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }]
    })
    .then((articles) => {
        if (!articles) {
            res.send({
                error: 'No articles were found.'
            });
        } else {
            res.send({
                articles
            });
        }
    })
});

router.get('/', auth.requireUserLogin, (req, res) => {
    const articleId = req.query.articleId;

    if (!articleId) {
        return res.send({ error: 'Missing parameters' });
    }

    Article.findOne({
        where: {
            id: articleId
        },
        attributes: ['id', 'title', 'text'],
        include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }]
    })
    .then((article) => {
        if (!article) {
            res.send({
                error: 'No article was found.'
            });
        } else {
            res.send({
                article
            });
        }
    })
});

router.post('/imageupload', auth.requireUserLogin, (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ error: 'No files were uploaded.' });
    }

    const imageFile = req.files.imageFile;
    const key = uuidv4();

    AWS.config.update({region: 'eu-central-1'});

    const s3 = new AWS.S3({
        credentials: {
            accessKeyId: process.env.ZR_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.ZR_S3_SECRET_ACCESS_KEY,
        }
    });

    const fileStream = fs.createReadStream(imageFile.tempFilePath);

    fileStream.on('error', (err) => {
        console.error('File Error', err);
    });

    const uploadParams = {
        Bucket: 'zerorebound',
        Key: key,
        Body: fileStream,
        ACL: 'public-read',
    };

    s3.upload(uploadParams, (err, data) => {
        if (err) {
            return res.send({ error: 'Could not upload image to bucket.' });
        }

        return res.send({
            imageUrl: data.Location
        });
    });
});

module.exports = router;
