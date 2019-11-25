import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        response: null
    }
    componentDidMount() {
        axios.get('http://localhost:3001/api/me', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ response: response })
                this.setState({ username: response.data.username})
                this.setState({ email: response.data.email})
                console.log(response)
            })
    }

    logOut() {
        localStorage.setItem('token', null);
        window.location = '/';
    }
    render() {

        return (
            <div>
                <h1>Dashboard</h1>
                <p>Hello {this.state.username} {this.state.email}</p>
                <Button onClick={this.logOut}>Log out</Button>
            </div>
        );
    }
}

export default Dashboard;