import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../styles'
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import TextField from "@material-ui/core/TextField";
import CustomSnackbar from '../CustomSnackbar'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import Moment from 'react-moment';
import colorTask from "../utils/colorTask"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from '@material-ui/core/Icon';

class Task extends Component {
    state = {
        ready: false,
        projectReady: false,
        taskName: '',
        taskDescription: '',
        taskStatus: '',
        taskDueDate: null,
        selectedUser: '',
        userSelectActive: false,
    }
    handleClose = () => {
        this.setState({
            isError: !this.state.isError
        })
    };
    getProject(id) {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects/' + id, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ projectResponse: response.data })
                this.setState({ projectName: response.data.name })
                this.setState({ projectReady: true })
            })
    }
    getTask(id) {
        axios.get(process.env.REACT_APP_API_URL + '/api/tasks/' + id, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ taskResponse: response.data })
                this.setState({ taskName: response.data.name })
                this.setState({ taskDescription: response.data.description })
                this.setState({ taskDueDate: response.data.due_date })
                this.setState({ taskStatus: response.data.status })
                this.setState({ ready: true })

                this.getProject(response.data.parent_project._id)
            })
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const { match: { params } } = this.props;
        const taskId = params.id
        this.getTask(taskId)
    }
    updateWindowDimensions = e => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        //console.log(this.state.width + " " + this.state.height)
    }
    onChangeTaskName = e => {
        this.setState({
            taskName: e.target.value
        })
    }
    onChangeTaskDescription = e => {
        this.setState({
            taskDescription: e.target.value
        })
    }
    onChangeTaskDueDate = e => {
        this.setState({
            taskDueDate: e._d
        })
    }
    toggleUserSelect = e => {
        this.setState({ userSelectActive: !this.state.userSelectActive })
    }
    onChangeStatus = e => {
        this.setState({ taskStatus: e.target.value });

        const payload = {
            status: e.target.value || this.state.taskStatus
        }
        this.sendPayload(payload)
    }
    saveTask = e => {
        const payload = {
            name: this.state.taskName || this.taskResponse.name,
            description: this.state.taskDescription || this.state.taskResponse.description,
            due_date: this.state.taskDueDate || this.state.taskResponse.due_date,
        }
        this.sendPayload(payload)

    }
    sendPayload = payload => {
        axios.put(process.env.REACT_APP_API_URL + '/api/tasks/' + this.state.taskResponse._id,
            payload, { 'headers': { 'Authorization': localStorage.getItem('token') } })
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
    selectUser = e => {
        this.setState({ selectedUser: e })
    }
    assignUser = e => {
        let payload = {
            assignee: this.state.selectedUser
        }
        axios.post(process.env.REACT_APP_API_URL + '/api/tasks/' + this.state.taskResponse._id + '/users',
        payload, { 'headers': { 'Authorization': localStorage.getItem('token') } })
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
                        errorMessage: "Bad Request"
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
                width: this.state.width < 1024 ? '100%' : '50%',
                boxShadow: "2px 2px 2px Gray",
            }
            let rightDiv = {
                background: "linear-gradient(315deg, #d8e9ff 00%, rgba(255,255,255,1) 100%)",
                margin: '5px',
                marginTop: '4px',
                marginLeft: "2px",
                padding: "15px",
                width: this.state.width < 1024 ? '100%' : '40%',
                boxShadow: "2px 2px 2px Gray"
            }
            return (

                <div>
                    <h1>{this.state.taskResponse.parent_project.name}</h1>
                    <Button style={{ display: "block" }} variant="outline-secondary" onClick={() => this.props.history.goBack()}>Return</Button>
                    <div style={parent}>

                        <div style={leftDiv}>
                            <h2>{this.state.taskResponse.name}</h2>
                            <p>
                                Status:
                                <select value={this.state.taskStatus} onChange={this.onChangeStatus}>
                                    <option value='Pending'>Pending</option>
                                    <option value='In progress'>In progress</option>
                                    <option value='Completed'>Completed</option>
                                    <option value='Canceled'>Canceled</option>
                                </select>
                                <br />
                                {this.state.taskResponse.description || 'no description set'}<br />
                                {
                                    this.state.taskResponse.due_date ?
                                        <span>
                                            <b style={{ color: colorTask(this.state.taskResponse.due_date) }}>
                                                Due <Moment fromNow>{this.state.taskResponse.due_date}</Moment>
                                            </b>
                                            &nbsp;(<Moment format="HH:mm DD-MM-YYYY">{this.state.taskResponse.due_date}</Moment>)
                                        </span>
                                        :
                                        <b>No Due Date set</b>
                                }

                            </p>
                            <p>Added by <b>{this.state.taskResponse.added_by.username}</b> <Moment fromNow>{this.state.taskResponse.create_date}</Moment></p>
                            <h2>Assigned members</h2>
                            <List style={styles.list}>
                                {
                                    this.state.taskResponse.assigned_users.map((user) => (
                                        <ListItem button style={styles.listItem} key={user._id}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                {user.username}
                                            </div>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            <Button variant='outline-primary' onClick={this.toggleUserSelect}>
                                assign users to this task
                            </Button>
                            {
                                this.state.userSelectActive && this.state.projectReady ?
                                    <>
                                    <br/>
                                        Click on user to assign him to this task
                                        <List style={styles.list}>
                                            {
                                                this.state.projectResponse.members.map((member) => (
                                                    <ListItem button onClick={() => this.selectUser(member.user._id)}
                                                    style={
                                                        this.state.selectedUser === member.user._id ?
                                                            styles.listItemToggled : styles.listItem
                                                    } key={member._id}>
                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                            {
                                                                member.role === 'admin' ?
                                                                    <Icon>star</Icon>
                                                                    :
                                                                    <Icon>person</Icon>
                                                            }
                                                            {member.user.username}
                                                        </div>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                        <Button variant='outline-success' onClick={this.assignUser}>
                                            Assign
                                        </Button>
                                    </>
                                    :
                                    <></>
                            }

                        </div>
                        <div style={rightDiv}>
                            <h2>Edit Task</h2>
                            <TextField
                                required
                                label="Name"
                                margin="normal"
                                value={this.state.taskName}
                                onChange={this.onChangeTaskName}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                required
                                label="Description"
                                margin="normal"
                                value={this.state.taskDescription}
                                onChange={this.onChangeTaskDescription}
                                fullWidth
                                variant="outlined"
                            />
                            Due date<br />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker value={this.state.taskDueDate} onChange={this.onChangeTaskDueDate} />
                            </MuiPickersUtilsProvider>
                            <br /><br />
                            <Button variant="success" onClick={this.saveTask}>
                                Save
                            </Button>
                        </div>
                    </div>
                    <CustomSnackbar isError={this.state.isError} errorMessage={this.state.errorMessage} handleClose={this.handleClose} />

                </div>
            );
        } else {
            return (
                <CircularProgress />
            );
        }
    }
}

export default Task;