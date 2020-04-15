import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './signup.js';
import Signin from './signin.js';
import Profile from './profile.js';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signin" component={Signin} />
        <Route path="/" component={() => <Redirect to="/signin" />} />
      </Switch>
    </Router>
  );
}

export default App;
