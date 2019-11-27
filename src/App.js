import React, { Component } from 'react';
import LandingPage from "./components/LandingPage"
import Main from "./components/Main"
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
          <ProtectedRoute path="/main" component={Main} />
        </div>
      </Router>
    )
  }
}

export default App;
