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
    navBarHorizontal: {
        width: "100%",
        position: 'absolute',

    },
    navBarHorizontalItem: {
        width: '100%',
        flex: 1
    },
    navBarVertical: {

    },
    navBarVerticalItem: {
        width: '100%',
        color: 'white',
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
            // Vertical
            return (
                <div style={styles.menuPanel}>

                    <div style={styles.avatarAndName}>
                        <IconButton>
                            <Avatar
                                alt=" "
                                src="https://picsum.photos/id/237/200/300"
                                style={styles.avatar} />

                        </IconButton>
                        <Typography variant="h6">Hello {this.state.username}</Typography>
                    </div>

                    <div style={styles.listContainer}>
                        <Nav fill variant="pills" activeKey={window.location.pathname}>
                            {
                                [
                                    { name: "Dashboard", link: "/main" },
                                    { name: "Projects", link: "/main/projects" },
                                    { name: "Settings", link: "/main/settings" },
                                ].map((item, i) => (
                                    <Nav.Link style={styles.navBarVerticalItem} eventKey={item.link} key={i} onClick={() => { this.props.history.push(item.link) }}>
                                        {item.name}</Nav.Link>
                                ))
                            }
                            <Nav.Link style={styles.navBarVerticalItem} onClick={this.logOut}>
                                Log Out
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
                            { name: "Dashboard", link: "/main" },
                            { name: "Projects", link: "/main/projects" },
                            { name: "Settings", link: "/main/settings" },
                        ].map((item, i) => (
                            <Nav.Item key={i} style={styles.navBarHorizontalItem}>
                                <Nav.Link eventKey={item.link} onClick={() => { this.props.history.push(item.link) }}>{item.name}</Nav.Link>
                            </Nav.Item>
                        ))
                    }
                    <Nav.Link style={styles.navBarHorizontalItem} onClick={this.logOut}>
                        Log Out
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
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Main;