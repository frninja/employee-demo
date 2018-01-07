import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import EmployeeService from '../services/employee';

import './EmployeeIndex.css';

const SortDirections = {
    DESC: 'desc',
    ASC: 'asc'
}

class EmployeeIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSize: 10,
            sortBy: 'id',
            sortDirection: SortDirections.ASC
        }

        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.handleSortChanged = this.handleSortChanged.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees(this.getPaginationSettings())
        .then(response => {
            this.setState({pagedEmployees: response.data})
        })
        .catch(error => {console.log(error.message)});
    }

    handlePageChanged(pageNumber) {
        console.log('Page changed to ' + pageNumber);
        this.setState({currentPage: pageNumber});

        EmployeeService.getEmployees(this.getPaginationSettings({pageNumber}))
        .then(response => {
            this.setState({pagedEmployees: response.data})
        })
        .catch(error => {console.log(error.message)});
    }

    handleSortChanged(sortBy) {
        let sortDirection;
        if (sortBy !== this.state.sortBy) {
            sortDirection = SortDirections.ASC;
        }
        else {
            sortDirection = this.state.sortDirection === SortDirections.DESC ? SortDirections.ASC : SortDirections.DESC;
        }
        this.setState({sortBy, sortDirection});
        console.log('Sort changed to ' + sortBy + ' ' + sortDirection);

        EmployeeService.getEmployees(this.getPaginationSettings({
            pageNumber: 1,
            orderBy: sortBy,
            descending: sortDirection === SortDirections.DESC
        }))
        .then(response => {
            this.setState({pagedEmployees: response.data})
        })
        .catch(error => {console.log(error.message)});
    }

    getPaginationSettings(patch) {
        const settings =  {
            pageSize: this.state.pageSize,
            pageNumber: this.state.currentPage,
            orderBy: this.state.sortBy,
            descending: this.state.sortDirection === SortDirections.DESC
        }

        if (!patch)
            return settings;

        return Object.assign(settings, patch);
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
                <EmployeeTable items={items}
                               sortBy={this.state.sortBy}
                               sortDirection={this.state.sortDirection}
                               onSortChanged={this.handleSortChanged}/>
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

class EmployeeTable extends Component {
    render() {
        return (
            <Table>
                <EmployeeTableHeader sortBy={this.props.sortBy}
                                     sortDirection={this.props.sortDirection}
                                     onSortChanged={this.props.onSortChanged}/>
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

class EmployeeTableHeader extends Component {
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getNameWithDirection(name) {
        if (this.props.sortBy !== name)
            return this.capitalize(name);

        const direction = this.props.sortDirection === SortDirections.DESC ? '\u2191' : '\u2193';
        return this.capitalize(name) + direction;
    }

    render() {
        return (
            <thead>
            <tr>
                <th onClick={() => this.props.onSortChanged('name')}>{this.getNameWithDirection('name')}</th>
                <th onClick={() => this.props.onSortChanged('email')}>{this.getNameWithDirection('email')}</th>
                <th onClick={() => this.props.onSortChanged('birthday')}>{this.getNameWithDirection('birthday')}</th>
                <th onClick={() => this.props.onSortChanged('salary')}>{this.getNameWithDirection('salary')}</th>
            </tr>
            </thead>
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