import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";

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
        password: ""
    };

    onChangeUsername = e =>{
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

    onSubmit(e) {
        console.log(e)
    }

    render() {
        return (
            <div>
                <h1>Sign UP</h1>
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
                </form>
            </div>
        );
    }
}

export default SignUpForm;
