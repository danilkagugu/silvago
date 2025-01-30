import { Link } from "react-router-dom";
import css from "./BreadcrumbsMob.module.css";
import { GoHome } from "react-icons/go";
import { IoChevronForward } from "react-icons/io5";

const BreadcrumbsMob = () => {
  return (
    <nav className={css.breadcrumbsMob}>
      <div className={css.breadcrumbsListWrap}>
        <div className={css.breadcrumbsList}>
          <div className={css.productGroupMenuItem}>
            <Link className={css.breadcrumbsLink} to="/">
              <GoHome />
            </Link>
            <IoChevronForward
              className={`${css.icon} ${css.iconChevronRight}`}
            />
          </div>
          <div className={css.productGroupMenuItem}>
            <Link className={css.breadcrumbsLink} to="/catalog">
              Каталог
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbsMob;
