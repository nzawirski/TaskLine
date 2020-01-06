import React, { Component } from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import styles from '../../styles'

class Projects extends Component {

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
    getProjects() {
        axios.get(process.env.REACT_APP_API_URL + '/api/projects', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ projectsResponse: response.data })
                this.setState({ready: true})
                console.log(this.state.projectsResponse)
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
    render() {
        if(this.state.ready){
            return (
                <div>
                    <h1>Projects</h1>
                    <List style={styles.list}>
                    {
                        this.state.projectsResponse.map((project) => (
                            <ListItem button style={styles.listItem}>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    {project.name}
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    Tasks: {project.tasks.length} Members: {project.members.length}
                                </div>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    Latest activity: {project.latestActivity}
                                </div>
                            </ListItem>
                        ))
                    }
                    </List>
                </div>
            );
        }else{
            return (
                <h1>Wait.</h1>
            );
        }
        
    }
}

export default Projects;