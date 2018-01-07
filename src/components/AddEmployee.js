import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom';

import moment from 'moment';
import 'moment/min/locales.min'; // HACK: workaround for moment locale.

import EmployeeService from '../services/EmployeeService';

import 'react-datepicker/dist/react-datepicker.css';

class AddEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            birthDay: moment(),
            salary: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleBirthDayChange = this.handleBirthDayChange.bind(this);
        this.handleSalaryChange = this.handleSalaryChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleNameChange(name) {
        this.setState({name});
    }

    handleEmailChange(email) {
        this.setState({email});
    }

    handleBirthDayChange(date) {
        this.setState({birthDay: date});
    }

    handleSalaryChange(salary) {
        this.setState({salary});
    }

    validate() {
        const errors = [];
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!this.state.name) {
            errors.push('Name is required.');
        }
        if (!emailRegex.test(this.state.email)) {
            errors.push('Invalid email');
        }
        if (this.state.birthDay > moment.now()) {
            errors.push('Birth day should not be in future.');
        }
        if (!this.state.salary || new Number(this.state.salary) <= 0) {
            errors.push('Salary should be greater than zero.');
        }

        return errors;
    }

    handleSave() {
        const errors = this.validate();
        if (errors.length > 0) {
            console.log('Invalid employee input.');
            return;
        }

        console.log('Saving employee...');
        EmployeeService.createEmployee(this.state.name, this.state.email, this.state.birthDay, this.state.salary)
        .then(response => {
            console.log('Employee saved');
            const history = this.props.history;
            history.push('/employees');
        })
        .catch(error => console.log('Employee save failed: ' + error.message));
    }

    handleCancel() {
        console.log('Cancel adding employee!');

        const history = this.props.history;
        history.push('/employees');
    }

    render() {
        const errors = this.validate();

        return (
            <form onSubmit={this.handleSave}>
                <FormGroup controlId='name'>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl type='text' value={this.state.name} onChange={e => this.handleNameChange(e.target.value)}/>
                </FormGroup>
                <FormGroup controlId='email'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type='email' value={this.state.email} onChange={e => this.handleEmailChange(e.target.value)}/>
                </FormGroup>
                <FormGroup controlId='birthday'>
                    <ControlLabel>Birthday</ControlLabel>
                    <DatePicker selected={this.state.birthDay} locale={navigator.language} onChange={this.handleBirthDayChange}/>
                </FormGroup>
                <FormGroup controlId='salary'>
                    <ControlLabel>Salary</ControlLabel>
                    <FormControl type='number' value={this.state.salary} onChange={e => this.handleSalaryChange(e.target.value)}/>
                </FormGroup>
                <Button disabled={errors.length > 0} type='submit'>Save</Button>
                <Button bsStyle='warning' onClick={this.handleCancel}>Cancel</Button>
                <span className='error' hidden={errors.length === 0}>{errors.length > 0 ? errors[0] : ''}</span>
            </form>
        )
    }
}

export default withRouter(AddEmployee);
