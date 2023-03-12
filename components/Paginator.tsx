import { Pagination } from 'react-bootstrap';
import { PaginatorProps } from '../utils/types';

export const Paginator = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
  setCurrentPage,
  searchMovies,
}: PaginatorProps) => {

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    searchMovies();
  };
  
  return (
    <nav aria-label="Page navigation" className="paginator-nav text-white">
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        />

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            page === currentPage ||
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 2 && page <= currentPage + 2)
          ) {
            return (
              <Pagination.Item
                key={index}
                active={currentPage === page}
                onClick={() => handlePageClick(page)}
                className="paginator-item"
              >
                {page}
              </Pagination.Item>
            );
          } else if (page === currentPage - 3 || page === currentPage + 3) {
            return (
              <Pagination.Ellipsis key={index} disabled className="paginator-item" />
            );
          } else {
            return null;
          }
        })}

        <Pagination.Next
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </nav>
  );
};
