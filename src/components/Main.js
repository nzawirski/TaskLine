import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import Dashboard from './MainContainer/Dashboard'
import Projects from './MainContainer/Projects'
import Settings from './MainContainer/Settings'
import Project from './MainContainer/Project'
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Nav from 'react-bootstrap/Nav'
import styles from '../styles'
import placeholder from '../images/user_placeholder.png'
import Icon from '@material-ui/core/Icon';

class Main extends Component {
    constructor(props) {
        super(props)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.renderSidebar = this.renderSidebar.bind(this)
    }
    state = {
        response: null
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        axios.get(process.env.REACT_APP_API_URL + '/api/me', { 'headers': { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                this.setState({ response: response })
                this.setState({ username: response.data.username })
                this.setState({ email: response.data.email })
                this.setState({ profilePic: response.data.profilePic})
                //console.log(response)
            })
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


    renderSidebar() {
        if (this.state.width > 1024) {
            // Vertical
            let avatarSrc = process.env.REACT_APP_API_URL + '/' + this.state.profilePic
            return (
                <div style={styles.menuPanel}>

                    <div style={styles.avatarAndName}>
                        <IconButton>
                            <Avatar
                                alt=" "
                                src={
                                    !this.state.profilePic
                                        ? placeholder
                                        : avatarSrc
                                }
                                style={styles.avatar} />

                        </IconButton>
                        <Typography variant="h6">Hello {this.state.username}</Typography>
                    </div>

                    <div style={styles.listContainer}>
                        <Nav fill variant="pills" activeKey={window.location.pathname}>
                            {
                                [
                                    { icon: <Icon>dashboard</Icon>, name:'Dashboard', link: "/main" },
                                    { icon: <Icon>account_tree</Icon>,name:"Projects", link: "/main/projects" },
                                    { icon: <Icon>settings</Icon>,name:"Settings", link: "/main/settings" },
                                ].map((item, i) => (
                                    <Nav.Link style={styles.navBarVerticalItem} eventKey={item.link} key={i} onClick={() => { this.props.history.push(item.link) }}>
                                        {item.icon}&nbsp;{item.name}</Nav.Link>
                                ))
                            }
                            <Nav.Link style={styles.navBarVerticalItem} onClick={this.logOut}>
                                <Icon>exit_to_app</Icon>&nbsp;Log Out
                            </Nav.Link>
                        </Nav>
                    </div>
                </div>
            )
        } else {
            // Horizontal
            return (
                <Nav fill variant="pills" activeKey={window.location.pathname} style={styles.navBarHorizontal}>
                    {
                        [
                            { name: <Icon>dashboard</Icon>, link: "/main" },
                            { name: <Icon>account_tree</Icon>, link: "/main/projects" },
                            { name: <Icon>settings</Icon>, link: "/main/settings" },
                        ].map((item, i) => (
                            <Nav.Item key={i} style={styles.navBarHorizontalItem}>
                                <Nav.Link eventKey={item.link} onClick={() => { this.props.history.push(item.link) }}>{item.name}</Nav.Link>
                            </Nav.Item>
                        ))
                    }
                    <Nav.Link style={styles.navBarHorizontalItem} onClick={this.logOut}>
                        <Icon>exit_to_app</Icon>
                    </Nav.Link>
                </Nav>)
        }
    }

    render() {

        return (
            <div style={styles.mainContainer}>
                {/* SIDEBAR */}
                <this.renderSidebar />
                {/* CONTENT */}
                <div style={styles.contentPanel}>
                    <Switch>
                        <Route exact path={["/main", "/main/dashboard"]} component={Dashboard} />
                        <Route exact path={"/main/projects"} component={Projects} />
                        <Route exact path={"/main/settings"} component={Settings} />
                        <Route path={"/main/project/:id"} component={Project} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Main;