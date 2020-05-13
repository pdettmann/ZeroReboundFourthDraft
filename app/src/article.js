import React, {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';

const Article = (props) => {
    const articleId = props.match.params.id;

    const [article, setArticle] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [text, setText] = useState();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState();
    const { apiClient } = props;

    const performCreateComment = () => {
        apiClient.post('/comment/create', {
            text,
            articleId,
        })
        .then((res) => {
            const newComments = comments;
            newComments.splice(0, 0, res.data.comment);

            setText('');
            setComments([]);
            setComments(newComments);
        })
        .catch((err) => {
            setError('comment could not be created');
        })
    }

    useEffect(() => {
        apiClient.get(`/article/?articleId=${articleId}`)
        .then((res) => {
            setArticle(res.data.article);
        })
        .catch((err) => {
            console.log(err);
            setError("No article was found")
        });

        apiClient.get(`/comment/findByArticleId?articleId=${articleId}`)
        .then((res) => {
            setComments(res.data.comments);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const deleteCommentFunction = (commentId) => {
        apiClient.delete(`/comment/deleteComment?commentId=${commentId}`)
        .then((res) => {
            const newComments = comments.filter((comment) => {
                return comment.id !== commentId;
            });

            setComments(newComments);
        })
        .catch((err) => {
            console.log(err);
            setError('Something went wrong, comment could not be deleted')
        })
    }

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

    if (!comments) {
        return (
            <div>
                <button onClick={() => setRedirectUrl('/home')}>Home</button>
                <input type="text" id='searchBar' placeholder='Search...' /><br></br><br></br>
                <h1>{article.title}</h1><br></br><br></br>
                <h3>{article.text}</h3><br></br><br></br>
                <input type="text" value={text} id="comment" name="comment" placeholder="comment" onChange={(event) => setText(event.target.value)}/>
                <button type='submit' onClick={() => performCreateComment()}> Comment </button><br></br>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => setRedirectUrl('/home')}>Home</button>
                <button onClick={() => setRedirectUrl('/profile')}>Profile</button>
                <input type="text" className='searchBar' placeholder='Search...' /><br></br><br></br>
                <input type="text" className='searchBar' placeholder='Search...' /><br></br><br></br>
                <h1>{article.title}</h1><br></br>
                <h3>By {article.author.firstName} {article.author.lastName}</h3><br></br>
                <p>{article.text}</p><br></br><br></br>
                <input type="text"  value={text} className="inputComment" placeholder="Comment here..." onChange={(event) => setText(event.target.value)}/>
                <button type='submit' onClick={() => performCreateComment()}> Comment </button><br></br>
                <div><br></br>
                {comments.map((comment) => {
                    return  (
                        <div key={comment.id} className='commentBox'>
                            <img src={comment.avatarUrl} alt='avatar' height="50pt" width="50pt"></img>
                            <h3>{comment.commenter.firstName} {comment.commenter.lastName}</h3>
                            <p>{comment.text}</p>
                            <div className="deleteCommentBox">
                                {comment.isCommenter && (
                                <button onClick = {() => deleteCommentFunction(comment.id)}>deleteComment</button>
                                )}
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
};

export default Article;
