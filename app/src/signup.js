import React, {useState} from "react";
import apiClient from './apiClient';
import { Redirect } from 'react-router-dom';


function Signup () {

    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [passwordTwo, setPasswordTwo] = useState();
    const [redirectUrl, setRedirectUrl] = useState();

    if (redirectUrl) {
        return <Redirect to={redirectUrl} />
    }

    const performSignup = () => {
        if (password === passwordTwo) {
            apiClient.post('/user/create', {firstName, lastName, email, password})
            .then( (res) => {
                console.log(res);
                console.log(res.data);
                setRedirectUrl('/profile');

            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            console.log('Passwords do not match');
            alert('Passwords do not match, please try again')
            setRedirectUrl('/signup')
        }

    };

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
