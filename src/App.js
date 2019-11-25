import React, { Component } from 'react';
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { ProtectedRoute } from './components/router/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path={["/", "/signIn", "/signUp"]} component={LandingPage} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    )
  }
}

export default App;
