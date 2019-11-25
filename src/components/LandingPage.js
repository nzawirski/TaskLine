import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import { ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';


class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const partent = {
            display: "flex",
            width: "100%",
            height: "100%",
            position: "absolute",
        }
        const leftDiv = {
            backgroundColor: "DodgerBlue",
            margin: "0px",
            padding: "15px",
            color: "white",
            width: "50%",

        }
        const rightDiv = {
            margin: "0px",
            padding: "15px",
            width: "50%",
        }

        //form button toggle
        let buttonToggle = 1
        if(window.location.pathname == "/signIn"){
            buttonToggle = 2
            
        }

        // check if not logged in already
        if( localStorage.getItem('token') && localStorage.getItem('token') !==  "null" ){
            window.location = '/dashboard';
        }

        return (
            <div style={partent}>
                <div style={leftDiv}>
                    <h1>Hello World</h1>
                    <p>Welcome to taskline blablaba</p>
                </div>
                <div style={rightDiv}>

                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={buttonToggle}>
                            <ToggleButton onClick={() => { this.props.history.push('/signUp') }} value={1}>Sign Up</ToggleButton>
                            <ToggleButton onClick={() => { this.props.history.push('/signIn') }} value={2}>Sign In</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>

                    <Switch>
                        <Route exact path="/signIn" component={SignInForm} />
                        <Route path="/" component={SignUpForm} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default LandingPage;