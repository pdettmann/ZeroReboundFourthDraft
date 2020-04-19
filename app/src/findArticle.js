import React, {useState, useEffect} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function FindArticle () {

    const [articles, setArticles] = useState();
    const [redirectUrl, setRedirectUrl] = useState();

    useEffect(() => {
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

    if (!articles) {
        return <div/>;
    }

    return (
        <div>
            {articles.map((article) => {
                return (<div key={article.id}>
                            <h1>{article.title}</h1>
                            <h2>{article.text}</h2>
                        </div>)
            })}
        </div>
    )

};

export default FindArticle;
