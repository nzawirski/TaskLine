import React, { Component } from 'react';
import colorTask from "../utils/colorTask"
import Moment from 'react-moment';
import styles from '../../styles'
import ListItem from "@material-ui/core/ListItem";

class TaskItem extends Component {
    state = {}

    render() {
        let task = this.props.task
        return (
            <ListItem button style={styles.listItem} onClick={() => this.props.onClick(task._id)} key={task._id}>
                <div style={{ display: 'flex', flexDirection: 'row' , fontWeight: 'bold'}}>
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
                    <div style={{ color: colorTask(task.due_date), display: 'flex', flexDirection: 'row', fontWeight: 'bold' }}>
                        Due&nbsp;<Moment fromNow>{task.due_date}</Moment>
                    </div>
                    :
                    null}
            </ListItem>
        );
    }
}

export default TaskItem;