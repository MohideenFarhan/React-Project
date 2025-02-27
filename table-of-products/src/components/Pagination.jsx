import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#10094; Prev
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &#10095;
      </button>
    </nav>
  );
};

export default Pagination;
