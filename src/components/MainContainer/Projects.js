import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Projects extends Component {

    state = {
        response: null
    }
    getMe(){
        axios.get(process.env.REACT_APP_API_URL + '/api/me', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ response: response })
                this.setState({ username: response.data.username })
                this.setState({ email: response.data.email })
                this.setState({ profilePic: response.data.profilePic })
            })
    }
    componentDidMount() {
        this.getMe()   
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