import React, {useState, useEffect} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function Article (props) {
    const articleId = props.match.params.id;

    const [article, setArticle] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [text, setText] = useState();
    const [comments, setComments] = useState([]);

    const performCreateComment = () => {
        apiClient.post('/comment/create', {
            text,
            articleId
        })
        .then((res) => {
            console.log(res.data);
        })
    }

    useEffect(() => {
        apiClient.get(`/article/?articleId=${articleId}`)
        .then((res) => {
            setArticle(res.data.article);
        })
        .catch((err) => {
            console.log(err);
            setRedirectUrl("/createArticle");
        });

        apiClient.get(`/comment/findByArticleId?articleId=${articleId}`)
        .then((res) => {
            setComments(res.data.comments);
        })
    }, []);



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
                    {article.title}<br></br><br></br>
                    {article.text}<br></br><br></br>
                <input type="text" id="comment" name="comment" placeholder="comment" onChange={(event) => setText(event.target.value)}/>
                <button type='submit' onClick={() => performCreateComment()}> Comment </button><br></br>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => setRedirectUrl('/home')}>Home</button>
                <input type="text" id='searchBar' placeholder='Search...' /><br></br><br></br>
                {article.title}<br></br><br></br>
                {article.text}<br></br><br></br>
                <input type="text" id="comment" name="comment" placeholder="comment" onChange={(event) => setText(event.target.value)}/>
                <button type='submit' onClick={() => performCreateComment()}> Comment </button><br></br>
                <div><br></br>
                {comments.map((comment) => {
                    return  (
                            <div key={comment.id}>
                                <img src={comment.avatarUrl} alt='user image'></img>
                                <h3>{comment.commenter.firstName} {comment.commenter.lastName}</h3>
                                <p>{comment.text}</p>
                            </div>
                    )
                })}
                </div>
            </div>
        )
    }



};

export default Article;
