import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const partent = {
            display: "flex",
            width: "100%",

        }
        const leftDiv = {
            backgroundColor: "DodgerBlue",
            margin: "0px",
            padding: "0px",
            color: "white",
            width: "50%",


        }
        const rightDiv = {
            width: "50%",
            height: "100%",

        }
        return (
            <div style={partent}>
                <div style={leftDiv}>
                    <h1>Hello World</h1>
                    <p>Welcome to taskline blablaba</p>
                </div>
                <div style={rightDiv}>
                    <List>
                        {
                            [{ name: "Sign Up", link: '/signUp' },
                            { name: "Sign In", link: '/signIn' },
                            ].map((item, i) => (
                                <ListItem button key={i}>
                                    <Link to={item.link}>{item.name}</Link>
                                </ListItem>
                            ))
                        }
                    </List>

                    <Switch>
                        <Route path="/signUp" component={SignUpForm} />

                        <Route path="/signIn" component={SignInForm} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default LandingPage;