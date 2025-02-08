import { IoChevronBackSharp, IoChevronForward } from "react-icons/io5";
import css from "./ProductPagination.module.css";

const ProductPagination = ({
  currentPage = 1,
  totalPages = 1,
  handlePageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];

    // Завжди додаємо першу сторінку
    pages.push(
      <span
        key={1}
        className={`${css.pageItem} ${currentPage === 1 ? css.activePage : ""}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </span>
    );

    if (totalPages > 1) {
      // Логіка для випадків з кількістю сторінок ≤ 10
      if (totalPages <= 10) {
        for (let i = 2; i <= totalPages; i++) {
          pages.push(
            <span
              key={i}
              className={`${css.pageItem} ${
                currentPage === i ? css.activePage : ""
              }`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </span>
          );
        }
      }

      // Логіка для випадків з кількістю сторінок > 10
      if (totalPages > 10) {
        if (currentPage > 4) pages.push(<span key="dots-start">...</span>);

        for (
          let i = Math.max(currentPage - 2, 2);
          i <= Math.min(currentPage + 2, totalPages - 1);
          i++
        ) {
          pages.push(
            <span
              key={i}
              className={`${css.pageItem} ${
                currentPage === i ? css.activePage : ""
              }`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </span>
          );
        }

        if (currentPage < totalPages - 3)
          pages.push(<span key="dots-end">...</span>);

        // Завжди додаємо останню сторінку
        pages.push(
          <span
            key={totalPages}
            className={`${css.pageItem} ${
              currentPage === totalPages ? css.activePage : ""
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </span>
        );
      }
    }

    return pages;
  };

  return (
    <div className={css.paginationContainer}>
      <nav className={css.pageList}>
        <div className={css.pageContainer}>
          <span
            className={css.pageItem}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          >
            <IoChevronBackSharp /> Назад
          </span>

          {renderPageNumbers()}

          <span
            className={css.pageItem}
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
          >
            Вперед
            <IoChevronForward />
          </span>
        </div>
      </nav>
    </div>
  );
};

export default ProductPagination;
