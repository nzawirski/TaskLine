import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Dashboard from './MainContainer/Dashboard'
import Projects from './MainContainer/Projects'
import Settings from './MainContainer/Settings'
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Nav from 'react-bootstrap/Nav'

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        
    },

    //Sidebar
    menuPanel: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        backgroundColor: 'dodgerblue',
        flex: 2,
        color: 'white'
    },
    avatarAndName: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingBottom: '20px',
        wordBreak: 'break-all'
    },
    avatar: {
        width: 180,
        height: 171,
        objectFit: 'cover'
    },
    //Topbar
    navBar: {
        width: "100%",
        position: 'absolute',
        display: 'flex',
    },
    navBarItem: {
        flex: 1
    },

    //Content
    contentPanel: {
        marginTop: '24px',
        padding: '1% 1% 0 1%',
        flex: 9,
        backgroundColor: '#FFFFFF'
    }
};

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
            return (
                <div style={styles.menuPanel}>

                    <div style={styles.avatarAndName}>
                        <IconButton>
                            <Avatar
                                alt=" "
                                src="https://picsum.photos/id/237/200/300"
                                style={styles.avatar} />

                        </IconButton>
                        <Typography variant="h6">Hello World</Typography>
                    </div>

                    <div style={styles.listContainer}>
                        <List>
                            {
                                [
                                    { name: "Dashboard", link: "/main" },
                                    { name: "Projects", link: "/main/projects" },
                                    { name: "Settings", link: "/main/settings" },
                                ].map((item, i) => (
                                    <ListItem button key={i} onClick={() => { this.props.history.push(item.link) }}>
                                        {item.name}
                                    </ListItem>
                                ))
                            }
                            <ListItem button onClick={this.logOut}>
                                Log Out
                            </ListItem>
                        </List>
                    </div>
                </div>
            )
        } else {
            return (
                <Nav variant="pills" activeKey={window.location.pathname} style={styles.navBar}>
                    {
                        [
                            { name: "Dashboard", link: "/main" },
                            { name: "Projects", link: "/main/projects" },
                            { name: "Settings", link: "/main/settings" },
                        ].map((item, i) => (
                            <Nav.Item key={i} style={styles.navBarItem}>
                                <Nav.Link eventKey={item.link} onClick={() => { this.props.history.push(item.link) }}>{item.name}</Nav.Link>
                            </Nav.Item>
                        ))
                    }
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
                    <h1>Main</h1>
                    <p>Hello {this.state.username} {this.state.email}</p>
                    <Switch>
                        <Route exact path={["/main", "/main/dashboard"]} component={Dashboard} />
                        <Route exact path={"/main/projects"} component={Projects} />
                        <Route exact path={"/main/settings"} component={Settings} />
                    </Switch>
                    <Button onClick={this.logOut}>Log out</Button>
                </div>
            </div>
        );
    }
}

export default Main;