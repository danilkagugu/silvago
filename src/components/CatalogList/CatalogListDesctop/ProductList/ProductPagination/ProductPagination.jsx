import { IoChevronBackSharp, IoChevronForward } from "react-icons/io5";
import css from "./ProductPagination.module.css";

const ProductPagination = () => {
  return (
    <div className={css.paginationContainer}>
      <nav className={css.pageList}>
        <div className={css.pageContainer}>
          <span className={css.pageItem}>
            <IoChevronBackSharp /> Назад
          </span>
          <span className={css.pageItem}>1</span>
          <span className={css.pageItem}>2</span>
          <span className={css.pageItem}>3</span>
          <span className={css.pageItem}>
            Вперед
            <IoChevronForward />
          </span>
        </div>
      </nav>
    </div>
  );
};

export default ProductPagination;
