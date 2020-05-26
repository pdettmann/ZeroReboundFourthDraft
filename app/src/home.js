import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';

function Home (props) {
    const [articles, setArticles] = useState([]);
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const { apiClient } = props;

    useEffect(() => {
        let isMounted = true;

        (async() => {
            const res = await apiClient.get('/article/home').catch(() => setError('Something went wrong, could not load page'));

            if (res && isMounted) { setArticles(res.data.articles) }
        })()

        return () => {
            isMounted = false;
        }
    }, [apiClient]);

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    if (error) {
        alert(error);
        setError(undefined);
    }

    return (
        <div>
            <button onClick={() => setRedirectUrl('/profile')}>Profile</button>
            <h1>ZeroRebound</h1>
            <div>
                {articles.map((article) => {
                    return  (
                        <div key={article.id} className='homeArticleDiv'>
                            <a href={`/article/${article.id}`}>
                                <div>
                                    <h2>{article.title}</h2>
                                </div>
                            </a>
                            <h3>{article.author.firstName} {article.author.lastName}</h3>
                            <h3>{article.text}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
