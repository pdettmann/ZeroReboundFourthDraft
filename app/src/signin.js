import React, {useState, useContext, useEffect} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';
import { UserContext } from './userContext';

function Signin () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/user/profile')
        .then((res) => {
            setUser(res.data.user);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    const performSignin = () => {
        apiClient.post('/user/auth', {email, password})
            .then((res) => {
                setUser(res.data.user);
                setRedirectUrl('/profile');
            })
            .catch((error) => {
                console.log(error);
                setError('invalid login');
            });
    }

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    if (user) {
        return <Redirect to='/profile' />
    }

    if (loading) {
        return <div/>
    }

    if (error) {
        alert(error);
        setError(undefined);
    }

    return (
        <div className='signin'>
            <label>Email
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(event)=> setEmail(event.target.value)}
                />
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
