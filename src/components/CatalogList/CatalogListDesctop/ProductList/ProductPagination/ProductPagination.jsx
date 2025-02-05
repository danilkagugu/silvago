import { IoChevronBackSharp, IoChevronForward } from "react-icons/io5";
import css from "./ProductPagination.module.css";

const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];

    // Завжди додаємо першу сторінку
    pages.push(
      <span
        key={1}
        className={`${css.pageItem} ${currentPage === 1 ? css.activePage : ""}`}
        onClick={() => onPageChange(1)}
      >
        1
      </span>
    );

    if (totalPages > 1) {
      // Якщо сторінок більше 10, додаємо логіку для `...`
      if (totalPages > 10) {
        if (currentPage > 4) pages.push(<span key="dots-start">...</span>);

        // Додаємо сторінки навколо поточної
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
              onClick={() => onPageChange(i)}
            >
              {i}
            </span>
          );
        }

        if (currentPage < totalPages - 3)
          pages.push(<span key="dots-end">...</span>);
      }

      // Завжди додаємо останню сторінку
      pages.push(
        <span
          key={totalPages}
          className={`${css.pageItem} ${
            currentPage === totalPages ? css.activePage : ""
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </span>
      );
    }

    return pages;
  };

  return (
    <div className={css.paginationContainer}>
      <nav className={css.pageList}>
        <div className={css.pageContainer}>
          <span
            className={css.pageItem}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            <IoChevronBackSharp /> Назад
          </span>

          {renderPageNumbers()}

          <span
            className={css.pageItem}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
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
