import React, { Component } from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from '../../styles'

import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "react-bootstrap/Button";
import Icon from '@material-ui/core/Icon';


import TaskItem from "./TaskItem"


class Project extends Component {

    constructor(props) {
        super(props)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    state = {
        ready: false,
        editNameModalActive: false,
        projectName: '',
        userModalActive: false,
        confirmDeleteModalActive: false,

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
                this.setState({ projectName: response.data.name })
                this.setState({ ready: true })
            })
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const { match: { params } } = this.props;
        const projectId = params.id
        this.getProject(projectId)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        //console.log(this.state.width + " " + this.state.height)
    }

    logOut() {
        localStorage.setItem('token', null);
        window.location = '/';
    }

    render() {
        if (this.state.ready) {
            const partent = {
                display: "flex",
                flexDirection: 'row',
                flexWrap: 'wrap',
            }
            let leftDiv = {
                backgroundColor: "white",
                margin: "0px",
                marginTop: '4px',
                padding: "15px",
                width: this.state.width < 1024 ? '90%' : '59%',
                boxShadow: "2px 2px 2px Gray",
            }
            let rightDiv = {
                backgroundColor: "white",
                margin: '0px',
                marginTop: '4px',
                marginLeft: "2px",
                padding: "15px",
                width: this.state.width < 1024 ? '90%' : '40%',
                boxShadow: "2px 2px 2px Gray"
            }
            return (
                <div>
                    <h1>{this.state.projectResponse.name}</h1>
                    <div style={partent}>

                        <div style={leftDiv}>
                            <h2>Tasks</h2>
                            <List style={styles.list}>
                                {
                                    this.state.projectResponse.tasks.map((task) => (
                                        <TaskItem task={task} onClick={(id) => this.props.history.push('/main/task/' + id)}></TaskItem>
                                    ))
                                }
                            </List>
                        </div>
                        <div style={rightDiv}>
                            <h2>Edit project</h2>
                            <Button>Edit project name</Button>
                            <h2>Members</h2>
                            <List style={styles.list}>
                                {
                                    this.state.projectResponse.members.map((member) => (
                                        <ListItem button style={styles.listItem} key={member._id}>
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