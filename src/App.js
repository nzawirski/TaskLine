import React from 'react';
import LandingPage from "./components/LandingPage"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route exact path="/" component={LandingPage} />
      </div>
    </Router>
  );
}

export default App;
