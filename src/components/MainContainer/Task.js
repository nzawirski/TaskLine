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

class Task extends Component {
    state = {
        ready: false,
        taskName: '',
        taskDescription: '',
        taskStatus: '',
        taskDueDate: null,
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
    onChangeStatus = e => {
        this.setState({taskStatus: e.target.value});
    }
    saveTask = e => {
        const payload = {
            name: this.state.taskName || this.taskResponse.name,
            description: this.state.taskDescription || this.state.taskResponse.description,
            due_date: this.state.taskDueDate || this.state.taskResponse.due_date,
            status: this.state.taskStatus || this.state.taskResponse.status
        }
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
                    <Button style={{ display: "block" }} variant="outline-secondary" onClick={() => this.props.history.goBack()}>Return to project</Button>
                    <div style={parent}>

                        <div style={leftDiv}>
                            <h2>{this.state.taskResponse.name}</h2>
                            <p>
                                Status: <b>{this.state.taskResponse.status}</b><br />
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
                            <select value={this.state.taskStatus} onChange={this.onChangeStatus}>
                                <option value='Pending'>Pending</option>
                                <option value='In progress'>In progress</option>
                                <option value='Completed'>Completed</option>
                                <option value='Canceled'>Canceled</option>
                            </select>
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
                            <br/><br/>
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