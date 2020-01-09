import React, { Component } from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from '../../styles'
import Moment from 'react-moment';
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "react-bootstrap/Button";

const partent = {
    display: "flex",
}
const leftDiv = {
    backgroundColor: "white",
    margin: "0px",
    padding: "15px",
    width: "60%",
    boxShadow: "2px 2px 2px Gray"
}
const rightDiv = {
    margin: "0px",
    marginLeft: "2px",
    padding: "15px",
    width: "40%",
    boxShadow: "2px 2px 2px Gray"
}

class Project extends Component {

    state = {
        response: null,
        ready: false
    }

    getMe() {
        axios.get(process.env.REACT_APP_API_URL + '/api/me', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ meResponse: response.data })
                this.setState({ username: response.data.username })
                this.setState({ email: response.data.email })
                this.setState({ profilePic: response.data.profilePic })
            })
    }
    getProject(id) {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects/' + id, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ projectResponse: response.data })
                this.setState({ ready: true })
                console.log(this.state.projectResponse)
            })
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        const projectId = params.id
        this.getProject(projectId)
    }

    logOut() {
        localStorage.setItem('token', null);
        window.location = '/';
    }

    render() {
        if (this.state.ready) {
            return (
                <div>
                    <h1>{this.state.projectResponse.name}</h1>
                    <div style={partent}>

                        <div style={leftDiv}>
                            <h2>Tasks</h2>
                            <List style={styles.list}>
                                {
                                    this.state.projectResponse.tasks.map((task) => (
                                        <ListItem button style={styles.listItem} onClick={() => { this.props.history.push('task/' + task._id) }} key={task._id}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                {task.name}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                {task.description}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                Status: {task.status}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                Added by {task.added_by.username} &nbsp;<Moment fromNow>{task.create_date}</Moment>
                                            </div>
                                            {task.due_date ? 
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                Due&nbsp;<Moment fromNow>{task.due_date}</Moment>
                                            </div>
                                            : 
                                            null}
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                        <div style={rightDiv}>
                            <h2>Other</h2>
                            <Button>Edit project name</Button>
                        </div>


                    </div>
                </div>
            )
        } else {
            return (
                <CircularProgress />
            );
        }
    }
}

export default Project;