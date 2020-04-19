import React, {useState} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function CreateArticle () {

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [redirectUrl, setRedirectUrl] = useState();

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    };

    const performCreateArticle = () => {
        apiClient.post('/article/create', {title, text})
            .then( (res) => {
                console.log(res.data);
                setRedirectUrl('/profile');
            })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <div>
            <h1>Create an Article</h1>
            <label>Title
                <input type="text" id="title" name="title" onChange={(event)=> setTitle(event.target.value)}/>
            </label><br></br>
            <label>Text
                <input type="text" id="text" name="text" onChange={(event)=> setText(event.target.value)}/>
            </label><br></br>
            <button type='submit' onClick={() => performCreateArticle()}> Create </button><br></br>
        </div>
    )
};

export default CreateArticle;
