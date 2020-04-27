import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './signup.js';
import Signin from './signin.js';
import Profile from './profile.js';
import Article from './article.js';
import CreateArticle from './createArticle';
import Home from './home';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/createArticle" component={CreateArticle} />
        <Route path="/article/:id" component={Article} />
        <Route exact path="/home" component={Home} />
        <Route path="/" component={() => <Redirect to="/signin" />} />
      </Switch>
    </Router>
  );
}

export default App;
