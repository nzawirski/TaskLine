import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Dashboard from './MainContainer/Dashboard'

class Main extends Component {

    state = {
        response: null
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + '/api/me', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ response: response })
                this.setState({ username: response.data.username })
                this.setState({ email: response.data.email })
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
                <h1>Main</h1>
                <p>Hello {this.state.username} {this.state.email}</p>
                <Switch>
                    <Route exact path={["/main", "/main/dashboard"]} component={Dashboard} />
                </Switch>
                <Button onClick={this.logOut}>Log out</Button>
            </div>
        );
    }
}

export default Main;