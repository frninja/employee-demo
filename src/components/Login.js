import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import AuthService from '../services/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        AuthService.login(this.state.username, this.state.password)
            .then(result => {
                // TODO: Route to employees.
                if (!result) {
                    console.log('Authentication failed.')
                }
                console.log('Authenticated.');
            })
            .catch(error => {
                // TODO: Stay at login, display error message.
                console.log('Authentication failed.');
            })
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username">
                        <ControlLabel>Login</ControlLabel>
                        <FormControl type="text" value={this.state.login} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password" value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit" disabled={!this.validateForm()}>Login</Button>
                </form>
            </div>
        );
    }
}

export default Login;
