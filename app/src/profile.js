import React, { useState, useEffect, useContext } from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';
import { UserContext } from './userContext';

function Profile () {
    const [articles, setArticles] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useContext(UserContext);

    console.log(user);

    // TODO: use async await
    useEffect(() => {
        apiClient.get('/user/profile')
        .then((res) => {
            setUser(res.data.user);

            apiClient.get('/user/articles')
            .then((res) => {
                setArticles(res.data.articles);
            })
            .catch((err) => {
                console.log(err);
                setError('Something went wrong, could not retreive articles');
            });
        })
        .catch((err) => {
            console.log(err);
            setUser();
        });
    }, []);

    const logoutFunction = () => {
        apiClient.delete('/user/logout')
        .then((res) => {
            console.log(res);
            setRedirectUrl("/signin");
        })
        .catch((err) => {
            console.log(err);
            setRedirectUrl("/profile");
        })
    };

    const deleteUserFunction = () => {
        apiClient.delete('/user/deleteUser')
        .then((res) => {
            console.log(res);
            setRedirectUrl('/signin');
        })
        .catch((err) => {
            console.log(err);
            setError('Something went wrong, user account could not be deleted')
        })
    }

    const deleteArticleFunction = (articleId) => {
        apiClient.delete(`/article/deleteArticle?articleId=${articleId}`)
        .then((res) => {
            const newArticles = articles.filter((article) => {
                return article.id !== articleId;
            });

            setArticles(newArticles);
        })
        .catch((err) => {
            console.log(err);
            setError('Something went wrong, article could not be deleted')
        })
    }

    if (!user) {
        return <Redirect to="/signin" />
    }

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    if (!user || !articles) {
        return <div/>;
    }

    if (error) {
        alert(error);
        setError(undefined);
    }

    return (
        <div>
            <button onClick={() => setRedirectUrl('/home')}>Home</button>
            <button onClick={() => logoutFunction()}>Logout</button><br></br>
            <button onClick={() => deleteUserFunction()}>Delete account</button><br></br>
            <h1>Welcome {user.firstName} </h1>
            <img src={user.avatarUrl} alt="profile" height="100pt" width="100pt" float="none" ></img><br></br><br></br>
            <h3> Name: {user.firstName} {user.lastName}</h3>
            <h3> Email: {user.email}</h3>
            <button type='createArticle' onClick={() => setRedirectUrl('/createArticle')}>Create an Article </button><br></br>
            <div>
            {articles.map((article) => {
                return  (
                        <div key={article.id}>
                            <a href={`/article/${article.id}`}>
                                <div>
                                    <h1>{article.title}</h1>
                                </div>
                            </a>
                            <button onClick={() => deleteArticleFunction(article.id)}>Delete Article</button><br></br>
                        </div>
                        )
            })}
            </div>
        </div>
    )

}

export default Profile;
