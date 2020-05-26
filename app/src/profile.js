import React, { useState, useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import { UserContext } from './userContext';

const Profile = (props) => {
    const [articles, setArticles] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useContext(UserContext);
    const { apiClient } = props;

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const profileResult = await apiClient.get('/user/profile').catch(() => setError('Something went wrong, could not fetch profile'));
            const articlesResult = await apiClient.get('/user/articles').catch(() => setError('Something went wrong, could not retreive articles'))

            if (profileResult && isMounted) {setUser(profileResult.data.user)}
            if (articlesResult && isMounted) {setArticles(articlesResult.data.articles)}
        })()

        return () => {
            isMounted = false;
        }
    }, [apiClient, setUser]);

    const performLogout = async () => {
        try {
            await apiClient.delete('/user/logout')
            setRedirectUrl("/signin");

        } catch {
            setError('Logout unsuccesful')
        }
    };

    const performDeleteUser = async () => {
        try {
            await apiClient.delete('/user/deleteUser')
            setRedirectUrl('/signin');
        } catch {
            setError('Something went wrong, user account could not be deleted')
        }
    }

    const performDeleteArticle = async (articleId) => {
        try {
            await apiClient.delete(`/article/deleteArticle?articleId=${articleId}`)
            const newArticles = articles.filter((article) => {
                return article.id !== articleId;
            });

            setArticles(newArticles);
        } catch {
            setError('Something went wrong, article could not be deleted')
        }
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
            <button id='logout' onClick={() => performLogout()}>Logout</button><br></br>
            <button id='deleteUser' onClick={() => performDeleteUser()}>Delete account</button><br></br>
            <h1>Welcome {user.firstName}</h1>
            <img src={user.avatarUrl} alt="profile" height="100pt" width="100pt" float="none" ></img><br></br><br></br>
            <h3>Name: {user.firstName} {user.lastName}</h3>
            <h3>Email: {user.email}</h3>
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
                        <button onClick={() => performDeleteArticle(article.id)}>Delete Article</button><br></br>
                    </div>
                )
            })}
            </div>
        </div>
    )

}

export default Profile;
