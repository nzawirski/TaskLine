import React, { Component } from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from '../../styles'
import Moment from 'react-moment';
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import TextField from "@material-ui/core/TextField";

class Projects extends Component {

    state = {
        response: null,
        ready: false,
        ProjectModalActive: false,
        projectName: ''
    }

    onChangeName = e => {
        this.setState({
            projectName: e.target.value
        })
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
    getProjects() {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ projectsResponse: response.data })
                this.setState({ ready: true })
            })
    }
    componentDidMount() {
        this.getMe()
        this.getProjects()
    }

    logOut() {
        localStorage.setItem('token', null);
        window.location = '/';
    }

    createProject = e => {

        const payload = {
            name: this.state.projectName,
        }
        axios.post(process.env.REACT_APP_API_URL + '/api/projects/', payload, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                window.location = '/main/projects';
            })
            .catch(error => {
                this.setState({ isError: true })

                return this.setState({
                    errorMessage: "Error, pls try again"
                })

            });
    }

    addProjectWindow() {
        return (
            <Modal show={this.state.ProjectModalActive} onHide={this.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField
                        required
                        label="Name"
                        margin="normal"
                        value={this.state.projectName}
                        onChange={this.onChangeName}
                        fullWidth
                        variant="outlined"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.createProject}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    toggleModal = e => {
        this.setState({ ProjectModalActive: !this.state.ProjectModalActive })
    }

    render() {
        if (this.state.ready) {
            return (
                <div>
                    <h1>Projects</h1>
                    <Button onClick={this.toggleModal} style={{ display: 'block' }}>Create new project</Button>
                    <List style={styles.list}>
                        {
                            this.state.projectsResponse.map((project) => (
                                <ListItem button style={styles.listItem} onClick={() => { this.props.history.push('project/' + project._id) }} key={project._id}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        {project.name}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        Tasks: {project.tasks.length} Members: {project.members.length}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        Latest activity:&nbsp; <Moment fromNow>{project.latestActivity}</Moment>
                                    </div>
                                </ListItem>
                            ))
                        }
                    </List>
                    {this.addProjectWindow()}
                </div>
            );
        } else {
            return (
                <CircularProgress />
            );
        }

    }
}

export default Projects;