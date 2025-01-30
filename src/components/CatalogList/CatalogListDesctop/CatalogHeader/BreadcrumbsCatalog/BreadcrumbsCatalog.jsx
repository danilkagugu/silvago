import { Link } from "react-router-dom";
import css from "./BreadcrumbsCatalog.module.css";
import { IoChevronForward } from "react-icons/io5";
const BreadcrumbsCatalog = () => {
  return (
    <nav className={css.productGroupMenu}>
      <div className={css.productGroupMenuItem}>
        <Link className={css.productGroupMenuItemLink} to="/">
          Головна
        </Link>
        <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
      </div>
      <div className={css.productGroupMenuItem}>
        <Link className={css.productGroupMenuItemLink} to="/catalog">
          Каталог
        </Link>
      </div>
    </nav>
  );
};

export default BreadcrumbsCatalog;
