import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import CustomSnackbar from '../CustomSnackbar'
import styles from '../../styles'

class SignInForm extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: null,
        isError: false
    };

    onChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault();

        const credentials = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(process.env.REACT_APP_API_URL + '/api/login/', credentials)
            .then(response => {
                localStorage.setItem('token', 'Bearer ' + response.data.token);
                window.location = '/';
            })
            .catch(error => {
                this.setState({ isError: true })

                if(!error.response){
                    return this.setState({
                        errorMessage: "Error, pls try again"
                    })
                }

                switch (error.response.status) {
                    case 400:
                        this.setState({
                            errorMessage: "Username or password are incorrect"
                        })
                        break;
                    case 404:
                        this.setState({
                            errorMessage: "User does not exist"
                        })
                        break;
                    default:
                        this.setState({
                            errorMessage: "Error, pls try again"
                        })
                        break;
                }

            });

        //window.location = '/';
    }
    handleClose = () => {
        this.setState({
            isError: !this.state.isError
        })
    };

    render() {
        return (
            <div>
                <h1>Sign IN</h1>
                <form style={styles.contentBox} onSubmit={this.onSubmit}>
                    <TextField
                        required
                        label="Email"
                        margin="normal"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        required
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
                        {'Login'}
                    </Button>
                    <CustomSnackbar isError={this.state.isError} errorMessage={this.state.errorMessage} handleClose={this.handleClose} />
                </form>
            </div>
        );
    }
}

export default SignInForm;
