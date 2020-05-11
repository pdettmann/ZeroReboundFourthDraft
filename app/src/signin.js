import React, {useState, useContext, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { UserContext } from './userContext';

const Signin = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const { apiClient } = props;

    useEffect(() => {
        apiClient.get('/user/profile')
        .then((res) => {
            setUser(res.data.user);
        })
        .catch((error) => {
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
            <h3>ZeroRebound</h3>
            <h1>Sign in</h1>
            <input type="text" className="signinEmail" placeholder='Email' onChange={(event)=> setEmail(event.target.value)}/><br></br>
            <input type="password" className="signinPassword" placeholder='Password'  onChange={(event)=> setPassword(event.target.value)}/><br></br>
            <button type='submit' onClick={() => performSignin()}> Submit </button><br></br>
            <button type='signup' onClick={() => setRedirectUrl('/signup')}>Register </button><br></br>
        </div>
    );
};

export default Signin;
