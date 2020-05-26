import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';

const Article = (props) => {
    const articleId = props.match.params.id;

    const [article, setArticle] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [text, setText] = useState();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState();
    const { apiClient } = props;

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const articleResult = await apiClient.get(`/article/?articleId=${articleId}`).catch(() => setError('No article was found'));
            const commentsResult = await apiClient.get(`/comment/findByArticleId?articleId=${articleId}`).catch(error => console.error(error));

            if (articleResult && isMounted) { setArticle(articleResult.data.article) }
            if (commentsResult && isMounted) { setComments(commentsResult.data.comments) }
        })();

        return () => {
            isMounted = false;
        }
    }, [apiClient, articleId]);

    const performCreateComment = async () => {
        try {
            const res = await apiClient.post('/comment/create', { text, articleId });

            const newComments = comments;
            newComments.splice(0, 0, res.data.comment);

            setText(null);
            setComments([]);
            setComments(newComments);
        } catch {
            setError('The comment could not be created');
        }
    };

    const performDeleteComment = async (commentId) => {
        try {
            await apiClient.delete(`/comment/deleteComment?commentId=${commentId}`)

            const newComments = comments.filter((comment) => {
                return comment.id !== commentId;
            });

            setComments(newComments);
        } catch {
            setError('Something went wrong, comment could not be deleted')
        }
    };

    if (error) {
        alert(error);
        setError(undefined);
    }

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    if (!article) {
        return <div/>;
    }

    return (
        <div>
            <button onClick={() => setRedirectUrl('/home')}>Home</button>
            <button onClick={() => setRedirectUrl('/profile')}>Profile</button>
            <input type="text" className='searchBar' placeholder='Search...' /><br></br><br></br>
            <h1>{article.title}</h1><br></br>
            <h3>By {article.author.firstName} {article.author.lastName}</h3><br></br>
            <p>{article.text}</p><br></br><br></br>
            <input type="text"  value={text || ''} className="inputComment" placeholder="Comment here..." onChange={(event) => setText(event.target.value)}/>
            <button id="createComment" type='submit' onClick={() => performCreateComment()}> Comment </button><br></br>
            <div>
                {!comments ? <div/> :
                    <div><br></br>
                    {comments.map((comment) => {
                        return  (
                            <div key={comment.id} className='commentBox'>
                                <img src={comment.avatarUrl} alt='avatar' height="50pt" width="50pt"></img>
                                <h3>{comment.commenter.firstName} {comment.commenter.lastName}</h3>
                                <p>{comment.text}</p>
                                <div className="deleteCommentBox">
                                    {comment.isCommenter && (
                                    <button onClick = {() => performDeleteComment(comment.id)}>delete comment</button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                }
            </div>
        </div>
    )
};


export default Article;
