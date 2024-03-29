import React, { Component } from 'react';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from '../../styles'
import { DebounceInput } from 'react-debounce-input';
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "react-bootstrap/Button";
import Icon from '@material-ui/core/Icon';
import Modal from 'react-bootstrap/Modal'
import TextField from "@material-ui/core/TextField";
import CustomSnackbar from '../CustomSnackbar'
import Moment from 'react-moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
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
        taskName: '',
        taskDescription: '',
        taskDueDate: null,
        addTaskModalActive: false,
        addMemberModalActive: false,
        editMemberModalActive: false,
        searchFinished: false,
        selectedUser: '',

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

    toggleEditNameModal = e => {
        this.setState({ editNameModalActive: !this.state.editNameModalActive })
    }
    toggleDeleteModal = e => {
        this.setState({ confirmDeleteModalActive: !this.state.confirmDeleteModalActive })
    }
    toggleAddTaskModal = e => {
        this.setState({ addTaskModalActive: !this.state.addTaskModalActive })
    }
    toggleAddMemberModal = e => {
        this.setState({ addMemberModalActive: !this.state.addMemberModalActive })
    }
    toggleEditMemberModal = e => {
        this.setState({ editMemberModalActive: !this.state.editMemberModalActive })
    }
    onChangeName = e => {
        this.setState({
            projectName: e.target.value
        })
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
    onChangeSearchTerm = e => {
        this.setState({
            searchTerm: e.target.value
        })
        this.searchUser()
    }
    saveName = e => {

        const payload = {
            name: this.state.projectName,
        }
        axios.put(process.env.REACT_APP_API_URL + '/api/projects/' + this.state.projectResponse._id, payload, { 'headers': { 'Authorization': localStorage.getItem('token') } })
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

    editNameModal = e => {
        return (
            <Modal show={this.state.editNameModalActive} onHide={this.toggleEditNameModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Project name</Modal.Title>
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
                    <Button variant="secondary" onClick={this.toggleEditNameModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveName}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    deleteProject = e => {
        axios.delete(process.env.REACT_APP_API_URL + '/api/projects/' + this.state.projectResponse._id, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                window.location = '/';
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
                    <Modal.Title>Are you sure you want to delete this project?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleDeleteModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.deleteProject}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    selectUser = e => {
        this.setState({ selectedUser: e })
    }
    addMember = e => {
        const payload = {
            newUser: this.state.selectedUser,
        }
        axios.post(process.env.REACT_APP_API_URL + '/api/projects/' + this.state.projectResponse._id + '/members',
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
    searchUser = e => {
        this.setState({ searchFinished: false })
        axios.get(process.env.REACT_APP_API_URL + '/api/users/search?search=' + this.state.searchTerm, { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ searchResponse: response.data })
                this.setState({ searchFinished: true })
            })
    }

    addMemberModal = e => {
        return (
            <Modal show={this.state.addMemberModalActive} onHide={this.toggleAddMemberModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Search users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DebounceInput
                        element={TextField}
                        fullWidth
                        variant="outlined"
                        placeholder="Search user"
                        minLength={1}
                        debounceTimeout={900}
                        onChange={this.onChangeSearchTerm}
                    />
                    {
                        this.state.searchResponse ?
                            <List style={styles.list}>
                                {
                                    this.state.searchFinished ?
                                        this.state.searchResponse.map((user) => (
                                            <ListItem button
                                                onClick={() => this.selectUser(user._id)}
                                                style={
                                                    this.state.selectedUser === user._id ?
                                                        styles.listItemToggled : styles.listItem
                                                }
                                                key={user._id}>
                                                <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 'bold' }}>
                                                    {user.username} {user.email}
                                                </div>
                                            </ListItem>
                                        ))
                                        :
                                        <CircularProgress />
                                }
                            </List>
                            :
                            null
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleAddMemberModal}>
                        Close
                    </Button>
                    {
                        this.state.selectedUser ?
                            <Button variant="success" onClick={this.addMember}>
                                Add User
                            </Button>
                            :
                            null
                    }
                </Modal.Footer>
            </Modal>
        )
    }

    addTask = e => {
        const payload = {
            name: this.state.taskName,
            description: this.state.taskDescription ? this.state.taskDescription : null,
            due_date: this.state.taskDueDate ? this.state.taskDueDate : null
        }
        axios.post(process.env.REACT_APP_API_URL + '/api/projects/' + this.state.projectResponse._id + '/tasks',
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

    addTaskModal = e => {
        return (
            <Modal show={this.state.addTaskModalActive} onHide={this.toggleAddTaskModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    Due date<br/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={this.state.taskDueDate} onChange={this.onChangeTaskDueDate} />
                    </MuiPickersUtilsProvider>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleAddTaskModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.addTask}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
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
                margin: "0px",
                marginTop: '4px',
                padding: "15px",
                width: this.state.width < 1024 ? '100%' : '59%',
                boxShadow: "2px 2px 2px Gray",
            }
            let rightDiv = {
                background: "linear-gradient(315deg, #d8e9ff 00%, rgba(255,255,255,1) 100%)",
                margin: '0px',
                marginTop: '4px',
                marginLeft: "2px",
                padding: "15px",
                width: this.state.width < 1024 ? '100%' : '40%',
                boxShadow: "2px 2px 2px Gray"
            }
            let projectId = this.state.projectResponse._id
            return (
                <div>
                    <h1>{this.state.projectResponse.name}</h1>
                    <div style={parent}>

                        <div style={leftDiv}>
                            <h2>Tasks</h2>
                            <p>Latest Activity: <Moment fromNow>{this.state.projectResponse.latestActivity}</Moment></p>
                            <Button variant="success" onClick={this.toggleAddTaskModal}>Add Task</Button>
                            <List style={styles.list}>
                                {
                                    this.state.projectResponse.tasks.map((task) => (
                                        <TaskItem task={task} onClick={(id) => this.props.history.push('/main/task/' + id)} key={task._id} screeWidth={this.state.width}></TaskItem>
                                    ))
                                }
                            </List>
                        </div>
                        <div style={rightDiv}>
                            <h2>Edit project</h2>
                            <Button onClick={this.toggleEditNameModal}>Edit project name</Button> &nbsp;
                            <Button variant="danger" onClick={this.toggleDeleteModal}>Delete project</Button>
                            <h2>Members</h2>
                            <Button variant="outline-success" onClick={this.toggleAddMemberModal}>Add new Member</Button> &nbsp;
                            <List style={styles.list}>
                                {
                                    this.state.projectResponse.members.map((member) => (
                                        <ListItem button style={styles.listItem} onClick={() => this.props.history.push('/main/project/'+projectId+'/member/'+member._id)} key={member._id}>
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
                    <CustomSnackbar isError={this.state.isError} errorMessage={this.state.errorMessage} handleClose={this.handleClose} />
                    {this.editNameModal()}
                    {this.confirmDeleteModal()}
                    {this.addTaskModal()}
                    {this.addMemberModal()}
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