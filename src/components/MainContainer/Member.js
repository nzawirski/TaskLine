import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../styles'
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "react-bootstrap/Button";
import Icon from '@material-ui/core/Icon';
import Modal from 'react-bootstrap/Modal'
import TextField from "@material-ui/core/TextField";
import CustomSnackbar from '../CustomSnackbar'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';


class Member extends Component {
    state = {
        ready: false,
    }
    getMember(projectId, memberId) {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects/' + projectId + '/members/' + memberId, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ memberResponse: response.data })
                this.setState({ ready: true })
                console.log(response.data)
            })
    }
    getProject(id) {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects/' + id, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ projectResponse: response.data })
                this.setState({ projectName: response.data.name })
                this.setState({ ready: true })
            })
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        const projectId = params.projectId
        const memberId = params.memberId
        this.getMember(projectId, memberId)
        this.getProject(projectId)
    }
    render() {
        if (this.state.ready) {
            return (
                <div>
                    <h1>Member options</h1>
                    <p>User <b> {this.state.memberResponse.user.username} </b> 
                    is an {this.state.memberResponse.role} of project <b> {this.state.projectName}</b>
                    </p>
                </div>
            );
        } else {
            return (
                <CircularProgress />
            );
        }

    }
}

export default Member;