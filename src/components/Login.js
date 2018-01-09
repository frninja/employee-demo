import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';

import './Login.css'

import AuthService from '../services/AuthService';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    isValid() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
            errorMessage: ''
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
            errorMessage: ''
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthService.login(this.state.username, this.state.password)
            .then(result => {
                this.setState({redirectToReferrer: true});
            })
            .catch(error => {
                return this.setState({errorMessage: error.message});
            });
    }

    render() {
        const { from } = this.props.location.state || {from: { pathname: '/employees' }};

        if (this.state.redirectToReferrer)
            return (
                <Redirect to={from}/>
        ) ;

        return (
            <div className='Login'>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId='username'>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl type='text' value={this.state.login} onChange={this.handleUsernameChange}/>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <Button type='submit' disabled={!this.isValid()}>Login</Button>
                    <label className='error' hidden={!this.state.errorMessage}>{this.state.errorMessage}</label>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
