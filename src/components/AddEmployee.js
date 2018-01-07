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
            salary: '',
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

    handleSave() {
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
                <Button type='submit'>Save</Button>
                <Button bsStyle='warning' onClick={this.handleCancel}>Cancel</Button>
            </form>
        )
    }
}

export default withRouter(AddEmployee);
