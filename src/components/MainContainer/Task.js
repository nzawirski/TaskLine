import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../styles'
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import CustomSnackbar from '../CustomSnackbar'
import Moment from 'react-moment';
import colorTask from "../utils/colorTask"

class Task extends Component {
    state = {
        ready: false,
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
                this.setState({ ready: true })
            })
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        const taskId = params.id
        this.getTask(taskId)
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
                    <h1>{this.state.taskResponse.parent_project.name}</h1>
                    <Button style={{display: "block"}} variant="outline-secondary" onClick={() => this.props.history.goBack()}>Return to project</Button>
                    <div style={parent}>

                        <div style={leftDiv}>
                            <h2>{this.state.taskResponse.name}</h2>
                            <p>
                                Status: <b>{this.state.taskResponse.status}</b><br/>
                                {this.state.taskResponse.description || 'no description set'}<br/>
                                {
                                    this.state.taskResponse.due_date ?
                                    <b style={{color: colorTask(this.state.taskResponse.due_date)}}>Due <Moment fromNow>{this.state.taskResponse.due_date}</Moment></b>
                                    :
                                    <b>No Due Date set</b>
                                }
                                
                            </p>
                            <p>Added by <b>{this.state.taskResponse.added_by.username}</b> <Moment fromNow>{this.state.taskResponse.create_date}</Moment></p>
                        </div>
                        <div style={rightDiv}>
TODO: edit task
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