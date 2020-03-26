const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { User, Article, Comment } = require('../models');
const session = require('express-session');

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.ZR_SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

const requireUserLogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.send({ error: 'Authentication required.' });
    }
};

app.delete('/user/logout', requireUserLogin, (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

app.post('/user/create', (req, res) => {
    // const { firstName, lastName, email, password } = req.body;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    // creating hash object
    const hash = crypto.createHash('sha512');
    // passing the data to be hashed
    const data = hash.update(password, 'utf-8');
    // Creating the hash in the required format
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
                res.send({
                    user: user
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

app.post('/user/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    })
    .then((user) => {
        if (user === null) {
            res.send({ error: 'Invalid login.' });
        } else {
            const hash = crypto.createHash('sha512');
            const data = hash.update(password, 'utf-8');
            const hashedPassword = data.digest('hex');

            if (user.hashedPassword !== hashedPassword) {
                res.send({ error: 'Invalid login.' });
            } else {
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
        console.error(error);
        res.send({ error: 'Something went wrong.' });
    })
});

app.get('/user/profile', requireUserLogin, (req, res) => {

    const userId = req.session.userId;

    User.findOne({
        where: {
            id: userId
        }
    })
    .then((user) => {
        if (!user) {
            res.send({
                error: 'No user was found.'
            });
        } else {
            res.send({
                user
            });
        }
    })
    .catch((error) => {
        res.send({ error: 'Something went wrong.' });
    });
});

app.get('/article/find', requireUserLogin, (req, res) => {
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


app.post('/article/create', (req, res) => {
    const title= req.body;
    const userId = req.session.userId;
    const text= req.body;

    Article.create({
                title: title,
                userId: userId,
                text: text,
            })
            .then((article) => {
                res.send({
                    article: article
                });
            })
            .catch((error) => {
                console.error(error);

                res.send({
                    error: 'Could not create article.'
                })
            });
});

app.get('/comment/find', (req, res) => {

    Comment.findOne({
        where: {
            userId: userId,
        }
    })
    .then((comment) => {
        if (!comment) {
            res.send({
                error: 'No comments were found.'
            });
        } else {
            res.send({
                comment
            });
        }
    })

});

app.post('/comment/create', (req, res) => {
    const userId= req.session.userId;
    const text= req.body;

    Comment.create({
        userId: userId,
        text: text,
    })
    .then((comment) => {
        res.send({
            comment: comment
        });
    })
    .catch((error) => {
        console.error(error);

        res.send({
            error: 'Could not create comment.'
        })
    });
});



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
