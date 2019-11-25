import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    logOut(){
        //console.log(localStorage.getItem('token'))
        localStorage.setItem('token',null);
        window.location = '/';
    }
    render() { 
        return ( 
            <div>
                <h1>Dashboard</h1>
                <Button onClick={this.logOut}>Log out</Button>
            </div>
         );
    }
}
 
export default LandingPage;