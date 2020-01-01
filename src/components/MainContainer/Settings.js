import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import CustomSnackbar from '../CustomSnackbar'

const styles = {
    contentBox: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 9
    }
};

class Settings extends Component {

    state = {
        username: '',
        password: '',
        errorMessage: null,
        isError: false,
        response: null
    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    componentDidMount() {

        axios.get(process.env.REACT_APP_API_URL + '/api/me', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ response: response })
                this.setState({ username: response.data.username })
                this.setState({ email: response.data.email })
            })
    }
    onSubmit = e => {
        e.preventDefault();
        
        let credentials = {
            username: this.state.username,
        }
        if(this.state.password){
            credentials.password = this.state.password
        }
        axios.put(process.env.REACT_APP_API_URL + '/api/me/', credentials, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                console.log('ok')
                window.location = '/';

            })
            .catch(error => {
                this.setState({isError: true})
                switch(error.response.status){
                    case 400:
                        this.setState({
                            errorMessage: "Bad request"
                        })
                        break;
                    default:
                        this.setState({
                            errorMessage: "Error, pls try again"
                        })
                        break;
                }
            });
    }

    render() {
        return (
            <div>
                <h1>Settings</h1>
                <form style={styles.contentBox} onSubmit={this.onSubmit}>
                    <TextField
                        required
                        label="Username"
                        margin="normal"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        margin="normal"
                        autoComplete="on"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        fullWidth
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        style={{ marginTop: '20px' }}
                        variant="outline-success"
                    >
                        {'Apply'}
                    </Button>
                    <CustomSnackbar isError={this.state.isError} errorMessage={this.state.errorMessage} handleClose={this.handleClose} />
                </form>
            </div>
        );
    }
}

export default Settings;