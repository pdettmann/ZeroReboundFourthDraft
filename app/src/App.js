import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './signup.js';
import Signin from './signin.js';
import Profile from './profile.js';
import Article from './article.js';
import CreateArticle from './createArticle';
import Home from './home';
import { UserProvider } from './userContext';
import apiClient from './apiClient';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/signup" component={() => <Signup apiClient={apiClient}/>} />
          <Route exact path="/profile" component={() => <Profile apiClient={apiClient}/>} />
          <Route exact path="/signin" component={() => <Signin apiClient={apiClient}/>} />
          <Route exact path="/createArticle" component={() => <CreateArticle apiClient={apiClient}/>} />
          <Route path="/article/:id" component={(props) => <Article {...props} apiClient={apiClient} />} />
          <Route exact path="/home" component={() => <Home apiClient={apiClient}/>} />
          <Route path="/" component={() => <Redirect to="/home" />} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
