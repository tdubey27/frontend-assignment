import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChange,
  setCurrentPage,
  gotoPage,
  setGoToPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setGoToPage(1);
  }, [rowsPerPage]);

  if (totalPages === 0) {
    return <div>No pages available.</div>;
  }

  const handlePageClick = (page) => {
    if (onPageChange && typeof onPageChange === "function" && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleToGo = () => {
    if (gotoPage < 1 || gotoPage > totalPages) {
      setError(`Page number must be between 1 and ${totalPages}`);
    } else {
      setError("");
      setCurrentPage(parseInt(gotoPage, 10));
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info" aria-live="polite">
        Total Pages: {totalPages}
      </div>

      <div className="pagination-input">
        <label htmlFor="go-to-page">Go to page:</label>
        <input
          type="number"
          id="go-to-page"
          onChange={(e) => setGoToPage(e.target.value)}
          placeholder="Enter page number"
          value={gotoPage || ""}
          aria-describedby="pagination-error"
        />
        <button
          onClick={handleToGo}
          aria-label={`Go to page ${gotoPage}`}
        >
          Go
        </button>
      </div>

      {error && (
        <div id="pagination-error" role="alert" aria-live="assertive" className="pagination-error">
          {error}
        </div>
      )}

      <div className="pagination-buttons">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        <button aria-live="polite">{currentPage}</button>
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  gotoPage: PropTypes.number,
  setGoToPage: PropTypes.func.isRequired,
};

export default Pagination;
