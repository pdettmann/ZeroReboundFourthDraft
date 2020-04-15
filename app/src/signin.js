import React from "react";
import axios from 'axios';

export default class Signin extends React.Component {
    state= {
        email: '',
        password: '',
    }

    handleChange = event => {
        this.setState({
            email: event.target.value,
            password: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('/user/auth', {user})
            .then( (res) => {
                console.log(res);
                console.log(res.data);
            })
            .catch((err) => {
            console.log(err);
            });;;;

    }

    render () {
        return (
            <div class='signin'>
                <form onSubmit={this.handleSubmit}>
                    <label>Email
                    <input type="text" id="email" name="email" onChange={this.handleChange}/>
                    </label><br></br>
                    <label>Password
                    <input type="text" id="password" name="password"/>
                    </label><br></br>
                    <button type='submit'> Submit </button><br></br>
                    <button type='signup'>Register </button><br></br>
                </form>
            </div>
        )
    }


}

