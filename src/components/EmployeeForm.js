import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import moment from 'moment';
import 'moment/min/locales.min'; // HACK: workaround for moment locale.

import 'react-datepicker/dist/react-datepicker.css';

import './EmployeeForm.css';

class EmployeeForm extends Component {
    constructor(props) {
        super(props);

        const unpackEmployeeWithDefaults = function ({ name = '', email = '', birthDay = moment(), salary = 0 } = {}) {
            return { name, email, birthDay, salary };
        };

        this.state = unpackEmployeeWithDefaults(this.props.employee);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleBirthDayChange = this.handleBirthDayChange.bind(this);
        this.handleSalaryChange = this.handleSalaryChange.bind(this);

        this.onSave = this.onSave.bind(this);
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
        // TODO: Replace with more rigorous regex.
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
        if (!this.state.salary || Number(this.state.salary) <= 0) {
            errors.push('Salary should be greater than zero.');
        }

        if (errors) {
            this.props.onInvalidInput(errors);
        }

        return errors;
    }

    onSave() {
        const errors = this.validate();
        if (errors.length > 0) {
            return;
        }

        this.props.onSave({
            name: this.state.name,
            email: this.state.email,
            birthDay: this.state.birthDay,
            salary: this.state.salary
        });
    }

    render() {
        return (
            <form onSubmit={this.onSave}>
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
                <Button type='submit'>Save</Button>
                <Button bsStyle='warning' onClick={this.props.onCancel}>Cancel</Button>
            </form>
        )
    }
}

export default EmployeeForm;
