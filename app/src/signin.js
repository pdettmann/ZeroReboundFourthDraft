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
        let isMounted = true;

        (async () => {
            const profileResult = await apiClient.get('/user/profile').catch(() => setLoading(false))

            if (profileResult && isMounted) { setUser(profileResult.data.user) }
        })()

        return () => {
            isMounted = false;
        }
    }, [apiClient, setUser]);

    const performSignin = async () => {
        try {
            const authResult = await apiClient.post('/user/auth', {email, password})

            setUser(authResult.data.user);
            setRedirectUrl('/profile');
        } catch {
            setError('invalid login');
        }
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
            <button type='submit' id='submitSignin' onClick={() => performSignin()}> Submit </button><br></br>
            <button type='signup' onClick={() => setRedirectUrl('/signup')}>Register </button><br></br>
        </div>
    );
};

export default Signin;
