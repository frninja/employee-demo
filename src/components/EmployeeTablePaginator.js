import React, { Component } from 'react';

import './EmployeeTablePaginator.css';

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

export default EmployeeTablePaginator;
