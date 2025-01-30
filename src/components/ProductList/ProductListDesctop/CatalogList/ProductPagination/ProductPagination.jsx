import css from "./ProductPagination.module.css";

const ProductPagination = ({ handlePageChange, currentPage, totalPages }) => {
  return (
    <div className={css.paginationContainer}>
      <nav className={css.pageList}>
        <div className={css.pageContainer}>
          <button
            className={css.pageItem}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Назад
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${css.pageItem} ${
                currentPage === index + 1 ? css.activePage : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={css.pageItem}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперед
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProductPagination;
