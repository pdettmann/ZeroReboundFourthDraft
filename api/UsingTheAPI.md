Using the API
-------------
using axios (npm install axios) for the XMLhttpRequests

API routes:

User
-----

# /user/create
Creates a User account:
 .post('/user/create', {firstName, lastName, email, password})

# /user/auth
Authenticates a User by email and password
 .post('/user/auth', {email, password})

# /user/profile
Fetches the User's profile information: first name, last name, email and avatar.
 .get('/user/profile')
(the userId used to get the profile is stored in the session)

# /user/articles
Fetches all articles belonging to the current User: retrieves article titles.
 .get('/user/articles')
(the userId used to get the profile is stored in the session)

# /user/logout
Destroys the current user session.
 .delete('/user/logout')

# /user/deleteUser
Removes the user and their articles and comments from the database
 .delete('/user/deleteUser')


Article
-------

# /article/home
Fetches the three most recent articles.
 .get('/article/home')

# /article/create
Creates an article with a title and text
 .post('/article/create', {title, text})
(userId is stored in the session)

# /article/
Fetches a particular article by articleId
 .get(`/article/?articleId=${articleId}`)

# /article/deleteArticle
Deletes an article and its comments
 .delete(`/article/deleteArticle?articleId=${articleId}`)


Comment
-------

# /comment/create
Creates a comment on an article
.post('/comment/create', { text, articleId })

# /comment/findByArticleId
Fetches comments that belong to a certain article
 .get(`/comment/findByArticleId?articleId=${articleId}`)

# /comment/deleteComment
Deletes a comment if the current user is the commenter
 .delete(`/comment/deleteComment?commentId=${commentId}`)

