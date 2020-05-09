import React, {useState, useContext} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';
import { UserContext } from './userContext';

const Signup = () => {
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [passwordTwo, setPasswordTwo] = useState();
    const [redirectUrl, setRedirectUrl] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useContext(UserContext);

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
            <label>First name:
                <input type="text" id="fname" name="fname" onChange={(event)=> setFirstName(event.target.value)}/>
            </label><br></br>
            <label>Last name:
                <input type="text" id="lname" name="lname" onChange={(event)=> setLastName(event.target.value)}/>
            </label><br></br>
            <label>Email:
                <input type="text" id="email" name="email" onChange={(event)=> setEmail(event.target.value)}/>
            </label><br></br>
            <label>Password:
                <input type="password" id="password" name="password" onChange={(event)=> setPassword(event.target.value)}/>
            </label><br></br>
            <label>Repeat password:
                <input type="password" id="passwordTwo" name="passwordTwo" onChange={(event)=> setPasswordTwo(event.target.value)}></input>
            </label><br></br>
            <button type='submit' onClick={() => performSignup()}> Submit </button><br></br>
        </div>
    );
}

export default Signup;
