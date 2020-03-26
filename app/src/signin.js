import React, { Component } from "react";

function Signin (){

    return (
        <div class='signin'>
            <label htmlFor="email">Email:</label><br></br>
            <input type="text" id="email" name="email"/><br></br>
            <label htmlFor="password">Password:</label><br></br>
            <input type="text" id="password" name="password"/><br></br>
        </div>
    );

}

export default Signin;
