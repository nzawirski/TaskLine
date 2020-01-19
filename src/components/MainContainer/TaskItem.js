import React, { Component } from 'react';
import colorTask from "../utils/colorTask"
import Moment from 'react-moment';
import ListItem from "@material-ui/core/ListItem";

class TaskItem extends Component {
    state = {}
    
    render() {
        let listItemRWD = {
            padding:'5px',
            margin:'1%',
            minWidth: '45%',
            maxWidth: this.props.screeWidth < 1024 ? '100%' : '45%',
            flexDirection:'column',
            fontFamily: 'monospace',
            fontSize: '15px',
            boxShadow: "1px 1px 2px #111111"
        }
        let task = this.props.task
        return (
            <ListItem button style={listItemRWD} onClick={() => this.props.onClick(task._id)} key={task._id}>
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
                    Added by {task.added_by.username}&nbsp;<Moment fromNow>{task.create_date}</Moment>
                </div>
                {task.due_date ?
                    <>
                        <div style={{ color: colorTask(task.due_date), display: 'flex', flexDirection: 'row', fontWeight: 'bold' }}>
                            Due&nbsp;<Moment fromNow>{task.due_date}</Moment>
                        </div>
                        <div style={{ color: colorTask(task.due_date), display: 'flex', flexDirection: 'row' }}>
                            (<Moment format="HH:mm DD-MM-YYYY">{task.due_date}</Moment>)
                        </div>
                    </>
                    :
                    null}
            </ListItem>
        );
    }
}

export default TaskItem;