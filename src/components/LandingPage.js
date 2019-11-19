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
        return (
            <div>
                <h1>Hello World</h1>
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
                
                    <Route path="/signIn" component={SignInForm}/>
                </Switch>

            </div>
        );
    }
}

export default LandingPage;