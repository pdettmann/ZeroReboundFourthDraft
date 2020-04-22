import React, { useState, useEffect } from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function Profile () {
    const [user, setUser] = useState();
    const [articles, setArticles] = useState();
    const [redirectUrl, setRedirectUrl] = useState();

    useEffect(() => {
        apiClient.get('/user/profile')
        .then((res) => {
            setUser(res.data.user);
        })
        .catch((err) => {
            console.log(err);
            setRedirectUrl("/signin");
        });

        apiClient.get('/user/articles')
        .then((res) => {
            setArticles(res.data.articles);
        })
        .catch((err) => {
            console.log(err);
            setRedirectUrl("/createArticle");
        });
    }, []);

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    if (!user || !articles) {
        return <div/>;
    }



    return (
        <div>
            <h1>Welcome {user.firstName} </h1>
            <h2> Name: {user.firstName} {user.lastName}</h2>
            <h2> Email: {user.email}</h2>
            <img src={user.avatarUrl} alt="profile picture" height="70pt" width="70pt"></img>
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
                        </div>
                        )
            })}
            </div>
        </div>
    )

}

export default Profile;