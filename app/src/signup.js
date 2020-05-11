import React, {useState, useContext} from "react";
import { Redirect } from 'react-router-dom';
import { UserContext } from './userContext';

const Signup = (props) => {
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [passwordTwo, setPasswordTwo] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useContext(UserContext);
    const { apiClient } = props;

    const performSignup = () => {
        if (password === passwordTwo) {
            apiClient.post('/user/create', {firstName, lastName, email, password})
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
                setError('Something went wrong')
            });
        } else {
            setError('Passwords do not match, please try again');
        }
    };

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    };

    if (user) {
        return <Redirect to="/profile" />
    };

    if (error) {
        alert(error);
        setError(undefined);
    }



    return (
        <div className='signup'>
            <button onClick={() => setRedirectUrl('/signin')}>Sign in</button>
            <h3>ZeroRebound</h3>
            <h1>Register</h1>
            <input type="text" id="fname" placeholder='First Name' onChange={(event)=> setFirstName(event.target.value)}/><br></br>
            <input type="text" id="lname"  placeholder='Last Name' onChange={(event)=> setLastName(event.target.value)}/><br></br>
            <input type="text" id="email"  placeholder='Email' onChange={(event)=> setEmail(event.target.value)}/><br></br>
            <input type="password" id="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)}/><br></br>
            <input type="password" id="passwordTwo" placeholder="Repeat Password" onChange={(event)=> setPasswordTwo(event.target.value)}></input><br></br>
            <button type='submit' onClick={() => performSignup()}> Submit </button><br></br>
        </div>
    );
}

export default Signup;
