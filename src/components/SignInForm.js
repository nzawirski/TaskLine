import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import CustomSnackbar from './CustomSnackbar'

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

class SignInForm extends Component {

    state = {
        username:'',
        password:'',
        errorMessage:null,
        isError:false
    };

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
    onSubmit = e => {
        e.preventDefault();

        const credentials = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:3001/api/login/', credentials)
            .then(response => {
                localStorage.setItem('token', 'Bearer ' + response.data.token);
                window.location = '/';
            })
            .catch(error => {
                this.setState({isError: true})
                switch(error.response.status){
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
            isError:!this.state.isError
        })
    };

    render() { 
        return ( 
            <div>
                <h1>Sign IN</h1>
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
