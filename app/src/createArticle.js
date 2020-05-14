import React, {useState, useContext} from "react";
import { Redirect } from 'react-router-dom';

const CreateArticle = (props) => {

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const { apiClient } = props;

    const performCreateArticle = () => {
        apiClient.post('/article/create', {title, text})
            .then((res) => {
                setRedirectUrl('/profile');
            })
            .catch((err) => {
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
            <input placeholder='Title' type="text" className="titleCreateArticle" onChange={(event)=> setTitle(event.target.value)}/><br></br>
            <textarea placeholder='Copy or write your article text here...' type="text" className="textCreateArticle" onChange={(event)=> setText(event.target.value)}/><br></br>
            <button type='submit' id='createArticle' onClick={() => performCreateArticle()}> Create </button><br></br>
        </div>
    )
};

export default CreateArticle;
