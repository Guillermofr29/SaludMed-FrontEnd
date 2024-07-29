import React from 'react';

interface PaginationProps {
  newsPerPage: number;
  totalNews: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ newsPerPage, totalNews, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const totalPages = pageNumbers.length;
    if (totalPages <= 5) {
      return pageNumbers.map(renderPageButton);
    }

    let pagesToShow = [1, totalPages];
    if (currentPage > 2) pagesToShow.push(currentPage - 1);
    if (currentPage > 1 && currentPage < totalPages) pagesToShow.push(currentPage);
    if (currentPage < totalPages - 1) pagesToShow.push(currentPage + 1);

    pagesToShow = Array.from(new Set(pagesToShow)).sort((a, b) => a - b);

    return pagesToShow.map((number, index) => {
      if (index > 0 && pagesToShow[index] - pagesToShow[index - 1] > 1) {
        return (
          <React.Fragment key={`ellipsis-${number}`}>
            <li className="mx-1">...</li>
            {renderPageButton(number)}
          </React.Fragment>
        );
      }
      return renderPageButton(number);
    });
  };

  const renderPageButton = (number: number) => (
    <li key={number} className="mx-1">
      <button
        onClick={() => paginate(number)}
        className={`px-2 sm:px-3 py-1 border rounded text-sm sm:text-base
          ${number === currentPage ? 'bg-blue text-white' : 'bg-white text-blue-500'}
          ${number === currentPage ? 'font-bold' : 'font-normal'}
          hover:bg-blue-100 transition-colors duration-200`}
      >
        {number}
      </button>
    </li>
  );

  return (
    <nav className="mt-4 overflow-x-auto">
      <ul className="flex justify-center items-center min-w-max">
        <li className="mx-1">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 sm:px-3 py-1 border rounded text-sm sm:text-base bg-white text-blue-500 hover:bg-blue-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
        </li>
        {renderPageNumbers()}
        <li className="mx-1">
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="px-2 sm:px-3 py-1 border rounded text-sm sm:text-base bg-white text-blue-500 hover:bg-blue-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;