import React, {Component} from 'react';
import Snackbar from "@material-ui/core/Snackbar";

class CustomSnackbar extends Component {

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.isError}
                autoHideDuration={7000}
                onClose={this.props.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.errorMessage}</span>}
            />
        );
    }
}

export default CustomSnackbar;