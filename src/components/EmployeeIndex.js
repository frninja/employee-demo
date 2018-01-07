import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import EmployeeService from '../services/employee';

import './EmployeeIndex.css';

class EmployeeIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees({
            pageSize: 10,
            pageNumber: 1,
        })
        .then(response => {
            this.setState({pagedEmployees: response.data})
        })
        .catch(error => {console.log(error.message)});
    }

    handlePageChanged(pageNumber) {
        console.log('Page changed to ' + pageNumber);

        EmployeeService.getEmployees({
            pageSize: 10,
            pageNumber: pageNumber,
        })
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
                <EmployeeTablePaginator currentPage={pageNumber}
                                        totalPagesCount={totalPagesCount}
                                        onPageChanged={this.handlePageChanged}/>
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
                <td>{new Date(birthDay).toLocaleDateString()}</td>
                <td>{salary}</td>
                <td><Button>Edit</Button></td>
                <td><Button>Delete</Button></td>
            </tr>
        )
    }
}

class EmployeeTablePaginator extends Component {
    render() {
        const { currentPage, totalPagesCount } = this.props;
        const pages = [...Array(totalPagesCount).keys()].map(e => ++e);
        return (
            <div className='pagination'>
                <ul>
                    {
                        pages.map(page => (
                            <li key={page} className={page === currentPage ? 'current' : ''}>
                                <a onClick={() => this.props.onPageChanged(page)}>{page}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default EmployeeIndex;