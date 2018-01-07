import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import EmployeeTableHeader from './EmployeeTableHeader';
import EmployeeRow from './EmployeeRow';

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
                        <EmployeeRow key={employee.id} employee={employee} onDelete={this.props.onDelete}/>
                    ))
                }
                </tbody>
            </Table>
        )
    }
}

export default EmployeeTable;
