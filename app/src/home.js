import React, { useState, useEffect } from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function Home () {
    const [articles, setArticles] = useState([]);
    const [redirectUrl, setRedirectUrl] = useState();

    useEffect(() => {
        apiClient.get('/article/home')
        .then((res) => {
            setArticles(res.data.articles);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    // if (user is logged in ) {

    // }
    return (
        <div>
            <button onClick={() => setRedirectUrl('/profile')}>Profile</button>
            <h1>ZeroRebound</h1>
            <div>
                {articles.map((article) => {
                    return  (
                        <div key={article.id}>
                            <a href={`/article/${article.id}`}>
                                <div>
                                    <h1>{article.title}</h1>
                                </div>
                            </a>
                            <h3>{article.author.firstName}{article.author.lastName}</h3>
                            <h2>{article.text}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
