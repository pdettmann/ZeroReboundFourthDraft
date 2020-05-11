import React, {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';

const FindArticle = (props) => {

    const [articles, setArticles] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const { apiClient } = props;

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
