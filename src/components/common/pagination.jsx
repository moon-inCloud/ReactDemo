import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

const Pagination = props => {
    const { total, pageSize, currentPage, onPageChange } = props;
    const pageCount = Math.ceil(total / pageSize);
     if(pageCount === 1) return null
    const pages = _.range(1, pageCount + 1)
    return <nav>
        <ul className="pagination">
            {pages.map(item =>
                <li className={ item === currentPage ? 'page-item active' : 'page-item'} key={item}>
                    <a href='#' className="page-link" onClick={() => onPageChange(item)}>{item}</a>
                </li>
            )}
        </ul>
    </nav>
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;