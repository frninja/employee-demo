import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import EmployeeService from '../services/employee';

import './EmployeeIndex.css';

class EmployeeIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        EmployeeService.getEmployees({pageSize: 10})
        .then(response => {
            this.setState({pagedEmployees: response.data})
        })
        .catch(error => {console.log(error.message)});
    }

    render() {
        if (!this.state.pagedEmployees) {
            return (
                <div>Loading...</div>
            )
        }

        const { pageNumber, totalPagesCount, items } = this.state.pagedEmployees;
        return (
            <div>
                <AddEmployeeButton/> <br/>
                <EmployeeTable items={items}/>
                <EmployeeTablePaginator currentPage={pageNumber} totalPagesCount={totalPagesCount}/>
            </div>
        )
    }
}

class AddEmployeeButton extends Component {
    render() {
        return (
            <Button>Add</Button>
        )
    }
}

class EmployeeTableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Birtday</th>
                    <th>Salary</th>
                </tr>
            </thead>
        )
    }
}

class EmployeeTable extends Component {
    render() {
        return (
            <Table>
                <EmployeeTableHeader />
                <tbody>
                    {
                        this.props.items.map(employee => (
                            <EmployeeRow key={employee.id} employee={employee}/>
                        ))
                    }
                </tbody>
            </Table>
        )
    }
}

class EmployeeRow extends Component {
    render() {
        const { name, email, birthDay, salary } = this.props.employee;

        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{birthDay}</td>
                <td>{salary}</td>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </tr>
        )
    }
}

class EmployeeTablePaginator extends Component {
    render() {
        const { currentPage, totalPagesCount } = this.props;
        const pages = Array.apply(null, { length: totalPagesCount });
        return (
            <div className='pagination'>
                <ul>
                    {
                        pages.map((_, i) => (
                            <li key={i}>
                                <a>{i + 1}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default EmployeeIndex;