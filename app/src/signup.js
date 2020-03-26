import React, { Component } from "react";

function Signup () {

    return (
        <div class='signup'>
            <form id='registrationForm'/>
            <label htmlFor="fname">First name:</label><br></br>
            <input type="text" id="fname" name="fname"/><br></br>
            <label htmlFor="lname">Last name:</label><br></br>
            <input type="text" id="lname" name="lname"/><br></br>
            <label htmlFor="email">Email:</label><br></br>
            <input type="text" id="email" name="email"/><br></br>
            <label htmlFor="password">Password:</label><br></br>
            <input type="text" id="password" name="password"/><br></br>
            <label htmlFor="passwordTwo">Repeat password:</label><br></br>
            <input type="text" id="passwordTwo" name="passwordTwo"></input><br></br>
        </div>
    );
}

export default Signup;
