const express = require('express');
// const fs = require('fs');
// const AWS = require('aws-sdk');
// const Sequelize = require('sequelize');
// const uuidv4 = require('uuid/v4')
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

// router.get('/find', auth.requireUserLogin, (req, res) => {
//     const title = req.query.title;
//     const userId = req.query.userId;

//     if (!userId && !title) {
//         return res.send({ error: 'Missing parameters' });
//     }

//     const whereCondition = {};

//     if (title) {
//         whereCondition.title = {
//             [Sequelize.Op.iLike]: title
//         };
//     } else if (userId) {
//         whereCondition.userId = userId;
//     }

//     Article.findAll({
//         where: whereCondition,
//         attributes: ['id','title', 'text'],
//         include: [{ model: User, as: 'author', attributes: ['firstName', 'lastName'] }]
//     })
//     .then((articles) => {
//         if (!articles) {
//             res.send({
//                 error: 'No articles were found.'
//             });
//         } else {
//             res.send({
//                 articles
//             });
//         }
//     })
// });

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

// router.post('/imageupload', auth.requireUserLogin, (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send({ error: 'No files were uploaded.' });
//     }

//     const imageFile = req.files.imageFile;
//     const key = uuidv4();

//     AWS.config.update({region: 'eu-central-1'});

//     const s3 = new AWS.S3({
//         credentials: {
//             accessKeyId: process.env.ZR_S3_ACCESS_KEY_ID,
//             secretAccessKey: process.env.ZR_S3_SECRET_ACCESS_KEY,
//         }
//     });

//     const fileStream = fs.createReadStream(imageFile.tempFilePath);

//     fileStream.on('error', (err) => {
//         console.error('File Error', err);
//     });

//     const uploadParams = {
//         Bucket: 'zerorebound',
//         Key: key,
//         Body: fileStream,
//         ACL: 'public-read',
//     };

//     s3.upload(uploadParams, (err, data) => {
//         if (err) {
//             res.status(400);
//             return res.send({ error: 'Could not upload image to bucket.' });
//         }

//         return res.send({
//             imageUrl: data.Location
//         });
//     });
// });

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
