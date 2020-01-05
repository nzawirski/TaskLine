import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import CustomSnackbar from '../CustomSnackbar'
import styles from '../../styles'
import placeholder from '../../images/user_placeholder.png'


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
    onSubmit = e => {
        e.preventDefault();

        let credentials = {
            username: this.state.username,
        }
        if (this.state.password) {
            credentials.password = this.state.password
        }
        axios.put(process.env.REACT_APP_API_URL + '/api/me/', credentials, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                console.log('ok')
                window.location = '/';
            })
            .catch(error => {
                this.setState({ isError: true })
                switch (error.response.status) {
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
    profilePicChange = (image) => {
        if (image.type.substring(0, 5) === "image") {
            this.setState({ isError: false })
            const headers = {
                'Content-type': 'multipart/form-data',
                'Authorization': `${localStorage.getItem('token')}`
            };
            const instance = axios.create({
                baseURL: process.env.REACT_APP_API_URL,
                timeout: 3000,
                headers: headers
            });
            const formData = new FormData();
            formData.append('image', image);

            instance.put('/api/me/profilePic', formData)
                .then(response => {
                    console.log('ok')
                    this.getMe()
                })
                .catch(error => {
                    this.setState({ isError: true })
                    switch (error.response.status) {
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

        } else {
            this.setState({ isError: true })
            this.setState({
                errorMessage: "Incorrect file type"
            })
        }
    };

    render() {
        return (
            <div>
                <h1>Settings</h1>
                <form style={styles.contentBox} onSubmit={this.onSubmit}>
                    <img
                        alt=""
                        src={
                            this.state.profilePic === undefined
                                ? placeholder
                                : `${process.env.REACT_APP_API_URL + '/' + this.state.profilePic}`
                        }
                        style={styles.avatar} >
                    </img>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => this.profilePicChange(e.target.files[0])}
                    />
                </form>
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
                        label="New Password"
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