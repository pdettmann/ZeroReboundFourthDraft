import React, {useState, useContext} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function CreateArticle () {

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();

    const performCreateArticle = () => {
        apiClient.post('/article/create', {title, text})
            .then((res) => {
                console.log(res.data);
                setRedirectUrl('/profile');
            })
            .catch((err) => {
                console.log(err);
                setError('Something went wrong')
            });
    };

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    };

    if (error) {
        alert(error);
        setError(undefined);
    };

    return (
        <div>
            <button onClick={() => setRedirectUrl('/home')}>Home</button>
            <button onClick={() => setRedirectUrl('/profile')}>Profile</button>
            <h1>Create an Article</h1>
            <input placeholder='Title' type="text" class="titleCreateArticle" onChange={(event)=> setTitle(event.target.value)}/><br></br>
            <textarea placeholder='Copy or write your article text here...' type="text" class="textCreateArticle" onChange={(event)=> setText(event.target.value)}/><br></br>
            <button type='submit' onClick={() => performCreateArticle()}> Create </button><br></br>
        </div>
    )
};

export default CreateArticle;
