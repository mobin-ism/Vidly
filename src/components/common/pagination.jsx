import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = (props) => {
  const {totalItems, pageSize, currentPage, onPageChange} = props;
  const pagesCount = Math.ceil(totalItems / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={
              currentPage === page ? "page-item active" : "page-item"
            }
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems : PropTypes.number.isRequired,
  pageSize : PropTypes.number.isRequired,
  currentPage : PropTypes.number.isRequired,
  onPageChange : PropTypes.func.isRequired
}
export default Pagination;
