import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import axios from 'axios';
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

class SignUpForm extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        errorMessage: ""
    };

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }
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

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post(process.env.REACT_APP_API_URL + '/api/users/', user)
            .then(response => {
                window.location = '/';
            })
            .catch(error => {
                this.setState({isError: true})
                if(!error.response){
                    return this.setState({
                        errorMessage: "Error, pls try again"
                    })
                }
                switch(error.response.status){
                    case 400:
                        this.setState({
                            errorMessage: "Please fill out all fields"
                        })
                        break;
                    case 409:
                        this.setState({
                            errorMessage: "User already exists"
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
                <h1>Create new account</h1>
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
                        required
                        label="email"
                        type="email"
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
                        {'Register'}
                    </Button>
                    <CustomSnackbar isError={this.state.isError} errorMessage={this.state.errorMessage} handleClose={this.handleClose} />
                </form>
            </div>
        );
    }
}

export default SignUpForm;
