import React, { Component } from 'react';
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { ProtectedRoute } from './components/router/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container App">
          <Route path="/" component={LandingPage} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    )
  }
}

export default App;
