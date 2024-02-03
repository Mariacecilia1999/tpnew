import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 5;

    let startPage = Math.max(1, currentPage - Math.floor(range / 2));
    let endPage = Math.min(totalPages, startPage + range - 1);

    if (totalPages <= range) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.floor(range / 2)) {
      endPage = range;
    } else if (currentPage >= totalPages - Math.floor(range / 2)) {
      startPage = totalPages - range + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="px-3 flex gap-2 text-xs  flex-wrap items-center space-x-2 py-3 my-10">
        {currentPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="border bg-white-500 text-gray-400 px-2 py-1 rounded hover:border-blue-800 hover:text-blue-800 "
            >
              {'<'}
            </button>
            {currentPage > 2 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="border bg-white-500 text-gray-400 px-2 py-1 rounded hover:border-blue-800 hover:text-blue-800 "
                >
                  1
                </button>
                {currentPage > 3 && <span className="pagination-dots">...</span>}
              </>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`border bg-white-500 text-gray-400 px-2 py-1 rounded hover:border-blue-800 hover:text-blue-800   focus:outline-none ${
              page === currentPage ? 'bg-gray-800' : ''
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <>
            {currentPage < totalPages - 1 && <span className="pagination-dots">...</span>}
            {currentPage !== totalPages && (
              <>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="border bg-white-500 text-gray-400 px-2 py-1 rounded hover:border-blue-800 hover:text-blue-800 "
                >
                  {totalPages}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="border bg-white-500 text-gray-400 px-2 py-1 rounded hover:border-blue-800 hover:text-blue-800 "
                >
                  {'>'}
                </button>
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return <div className="pagination">{loading ? <LoadingSpinner /> : renderPageNumbers()}</div>;
};

export default Pagination;
