import React, { Component } from 'react';
import LandingPage from "./components/LandingPage"
import SignInForm from "./components/SignInForm"
import SignUpForm from "./components/SignUpForm"
import Dashboard from "./components/Dashboard"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { ProtectedRoute } from './components/router/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container App">
          <Route exact path="/" component={LandingPage} />
          <Route path="/signUp" component={SignUpForm} />
          <Route path="/signIn" component={SignInForm} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    )
  }
}

export default App;
