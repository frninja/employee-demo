import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import './Login.css'

import AuthService from '../services/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null
        };
    }

    getErrorMessage() {
        return this.state.error && this.state.error.message;
    }

    hasError() {
        return this.state.error !== null;
    }

    isValid() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    showError(error) {
        return this.setState({error: error})
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            error: null
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        AuthService.login(this.state.username, this.state.password)
            .then(result => {
                // TODO: Route to employees.
            })
            .catch(error => {
                this.showError(error);
            });
    }

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
                    <Button type="submit" disabled={!this.isValid()}>Login</Button>
                    <label className="error" hidden={!this.hasError()}>{this.getErrorMessage()}</label>
                </form>
            </div>
        );
    }
}

export default Login;
