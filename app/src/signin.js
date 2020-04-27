import React, {useState} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';

function Signin () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();

    const performSignin = () => {
        apiClient.post('/user/auth', {email, password})
            .then((res) => {
                console.log(res)
                setRedirectUrl('/profile')
            })
            .catch((error) => {
                console.log(error);
                setError('invalid login')
            });
    }

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    if (error) {
        return (
            alert(error),
            window.location.reload()
        )
    }

    return (
        <div className='signin'>
            <label>Email
                <input type="text" id="email" name="email" onChange={(event)=> setEmail(event.target.value)}/>
            </label><br></br>
            <label>Password
                <input type="password" id="password" name="password"  onChange={(event)=> setPassword(event.target.value)}/>
            </label><br></br>
            <button type='submit' onClick={() => performSignin()}> Submit </button><br></br>
            <button type='signup' onClick={() => setRedirectUrl('/signup')}>Register </button><br></br>
        </div>
    );
};

export default Signin;
