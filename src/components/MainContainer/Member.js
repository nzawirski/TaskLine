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
        role: '',
        confirmDeleteModalActive: false,
    }
    handleClose = () => {
        this.setState({
            isError: !this.state.isError
        })
    };
    getMember(projectId, memberId) {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects/' + projectId + '/members/' + memberId, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ memberResponse: response.data })
                this.setState({ role: response.data.role })
                this.setState({ ready: true })
                console.log(response.data)
            })
    }
    getProject(id) {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects/' + id, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ projectResponse: response.data })
                this.setState({ projectName: response.data.name })
            })
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        const projectId = params.projectId
        const memberId = params.memberId
        this.getMember(projectId, memberId)
        this.getProject(projectId)
    }
    handleOptionChange = e => {
        this.setState({ role: e.target.value })
    }
    toggleDeleteModal = e => {
        this.setState({ confirmDeleteModalActive: !this.state.confirmDeleteModalActive })
    }
    deleteMember = e => {
        axios.delete(process.env.REACT_APP_API_URL + '/api/projects/' + this.state.projectResponse._id + '/members/' + this.state.memberResponse._id,
         { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                window.location = '/main/project/' + this.state.projectResponse._id;
            })
            .catch(error => {
                this.setState({ isError: true })

                if (!error.response) {
                    return this.setState({
                        errorMessage: "Error, pls try again"
                    })
                }
                switch (error.response.status) {
                    case 403:
                        this.setState({
                            errorMessage: "You don't have permission to do this"
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
    confirmDeleteModal = e => {
        return (
            <Modal show={this.state.confirmDeleteModalActive} onHide={this.toggleDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to remove {this.state.memberResponse.user.username} from this project</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleDeleteModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.deleteMember}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    updateMember = e => {
        const payload = {
            role: this.state.role,
        }
        axios.put(process.env.REACT_APP_API_URL + '/api/projects/' 
        + this.state.projectResponse._id 
        + '/members/' 
        + this.state.memberResponse._id, payload, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                window.location.reload()
            })
            .catch(error => {
                this.setState({ isError: true })

                if (!error.response) {
                    return this.setState({
                        errorMessage: "Error, pls try again"
                    })
                }
                switch (error.response.status) {
                    case 400:
                        this.setState({
                            errorMessage: "Please fill out all fields"
                        })
                        break;
                    case 403:
                        this.setState({
                            errorMessage: "You don't have permission to do this"
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
        if (this.state.ready) {
            const parent = {
                display: "flex",
                flexDirection: 'row',
                flexWrap: 'wrap',
            }
            let leftDiv = {
                background: "linear-gradient(0deg, #f6fdff 100%, rgba(255,255,255,1) 0%)",
                margin: "5px",
                marginTop: '4px',
                padding: "15px",
                minWidth: "400px",
                boxShadow: "2px 2px 2px Gray",
            }
            let rightDiv = {
                background: "linear-gradient(315deg, #d8e9ff 00%, rgba(255,255,255,1) 100%)",
                margin: '5px',
                marginTop: '4px',
                marginLeft: "2px",
                padding: "15px",
                minWidth: "400px",
                boxShadow: "2px 2px 2px Gray"
            }
            return (
                <div>
                    <h1>{this.state.projectName}</h1>
                    <div style={parent}>

                        <div style={leftDiv}>
                            <h2>Member Info</h2>
                            <p>username: <b> {this.state.memberResponse.user.username} </b></p>
                            <p>email: <b>{this.state.memberResponse.user.email}</b></p>
                            <p>role in project {this.state.projectName}: <b>{this.state.memberResponse.role}</b></p>
                            <Button variant="outline-secondary" onClick={() => this.props.history.push('/main/project/' + this.state.projectResponse._id)}>
                                Return to project {this.state.projectName}</Button>
                        </div>
                        <div style={rightDiv}>

                            <h2>Edit mebmer role</h2>
                            <label>
                                <input type="radio" value="admin" checked={this.state.role == 'admin'} onChange={this.handleOptionChange} />
                                Admin
                            </label> &nbsp;
                            <label>
                                <input type="radio" value="member" checked={this.state.role == 'member'} onChange={this.handleOptionChange} />
                                Member
                            </label>
                            <br/>
                            <Button variant="outline-success" onClick={this.updateMember}>
                                Apply changes</Button>
                            <h2>Remove member from project</h2>
                            <Button variant="outline-danger" onClick={this.toggleDeleteModal}>
                                Remove {this.state.memberResponse.user.username} from project</Button>
                        </div>
                    </div>
                    <CustomSnackbar isError={this.state.isError} errorMessage={this.state.errorMessage} handleClose={this.handleClose} />
                    {this.confirmDeleteModal()}
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