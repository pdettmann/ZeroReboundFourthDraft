import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup.js';
import Signin from './Signin.js';
import Profile from './Profile.js';


function App() {
  return (
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/signin" component={Signin} />
      <Route path="/" component={() => <Redirect to="/signin" />} />
    </Switch>
  );
}

export default App;
