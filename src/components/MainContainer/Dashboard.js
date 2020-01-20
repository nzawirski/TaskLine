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

class Dashboard extends Component {

    state = {
        response: null,
        ready: false
    }
    getFeed() {
        axios.get(process.env.REACT_APP_API_URL + '/api/me/dashboard', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ response: response.data })
                this.setState({ ready: true })
            })
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.getFeed()
    }
    updateWindowDimensions = e => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        if (this.state.ready) {
            return (
                <div>
                    <h1>Dashboard</h1>
                    <List style={styles.list}>
                        {
                            this.state.response.map((task) => (
                                <TaskItem task={task} onClick={(id) => this.props.history.push('/main/task/' + id)} key={task._id} screeWidth={this.state.width}></TaskItem>
                            ))
                        }
                    </List>
                </div>
            );
        }
        else {
            return (
                <CircularProgress />
            );
        }
    }
}

export default Dashboard;