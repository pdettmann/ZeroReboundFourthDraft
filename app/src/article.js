import React, {useState, useEffect} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function Article (props) {
    const articleId = props.match.params.id;

    const [article, setArticle] = useState();
    const [redirectUrl, setRedirectUrl] = useState();

    useEffect(() => {
        apiClient.get(`/article/?articleId=${articleId}`)
        .then((res) => {
            setArticle(res.data.article);
        })
        .catch((err) => {
            console.log(err);
            setRedirectUrl("/createArticle");
        });
    }, []);

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    if (!article) {
        return <div/>;
    }

    return (
        <div>
            {article.text}
        </div>
    )

};

export default Article;
