import React, { Component } from 'react';

import AddEmployeeButton from './AddEmployeeButton';
import EmployeeTable from './EmployeeTable';
import EmployeeTablePaginator from './EmployeeTablePaginator';

import SortDirections from './shared/SortDirections';

import EmployeeService from '../services/EmployeeService';

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
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(id) {
        console.log('Delete employee \'' + id + '\'');

        EmployeeService.deleteEmployee(id).then(response => {
            this.handlePageChanged(this.state.currentPage);
        }).catch(error => console.log('Error while delete: ' + error.message));
    }

    handleEdit(id) {
        console.log('Edit employee \'' + id + '\'');


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
                               onSortChanged={this.handleSortChanged}
                               onDelete={this.handleDelete}/>
                <EmployeeTablePaginator currentPage={pageNumber}
                                        totalPagesCount={totalPagesCount}
                                        onPageChanged={this.handlePageChanged}/>
            </div>
        )
    }
}

export default EmployeeIndex;