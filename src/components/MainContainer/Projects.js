import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
// import axios from 'axios';

class Projects extends Component {

    state = {
        response: null
    }

    logOut() {
        localStorage.setItem('token', null);
        window.location = '/';
    }
    render() {

        return (
            <div>
                <h1>Projects</h1>
            </div>
        );
    }
}

export default Projects;